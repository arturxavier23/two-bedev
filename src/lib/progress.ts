// sistema de progresso do usuario
// salva tudo no localStorage do navegador por enquanto
// depois vamos migrar pro supabase
import { supabase } from "@/lib/supabase";
// supabase pode ser null se nao tiver as variaveis de ambiente
const KEY = "two_be_dev_progress";

// tipo de um registro no historico
export type HistoryEntry = {
  phaseId: number;
  phaseTitle: string;
  moduleName: string;
  score: number;
  total: number;
  xpGanho: number;
  data: string; // data que fez o exercicio
};

// tipo de um erro salvo pra revisao
export type WrongAnswer = {
  phaseId: number;
  question: string;
  userAnswer: string;    // o que o usuario respondeu
  correctAnswer: string; // resposta certa
  category: string;      // nome do modulo
};

export type Progress = {
  userName: string;
  totalXP: number;
  completedPhases: number[];
  favoritePhases: number[];
  history: HistoryEntry[];
  wrongAnswers: WrongAnswer[]; // exercicios que errou
};

// valores iniciais quando o usuario abre o app pela primeira vez
const defaultProgress: Progress = {
  userName: "Aluno",
  totalXP: 0,
  completedPhases: [],
  favoritePhases: [],
  history: [],
  wrongAnswers: [],
};

// pega o progresso salvo no navegador
export const getProgress = (): Progress => {
  const data = localStorage.getItem(KEY);
  if (!data) {
    return { ...defaultProgress };
  }
  return { ...defaultProgress, ...JSON.parse(data) };
};

// salva o progresso no navegador
export const saveProgress = (progress: Progress): void => {
  localStorage.setItem(KEY, JSON.stringify(progress));
};

// atualiza o nome do usuario
export const updateUserName = (newName: string): void => {
  const progress = getProgress();
  progress.userName = newName;
  saveProgress(progress);
};

export const addXP = (xp: number): void => {
  const progress = getProgress();
  progress.totalXP += xp;
  saveProgress(progress);
  // sincroniza com supabase em background
  syncToSupabase();
};

export const completePhase = (phaseId: number): void => {
  const progress = getProgress();
  if (!progress.completedPhases.includes(phaseId)) {
    progress.completedPhases.push(phaseId);
  }
  saveProgress(progress);
  // sincroniza com supabase em background
  syncToSupabase();
};
// adiciona ou remove uma fase dos favoritos
export const toggleFavorite = (phaseId: number): void => {
  const progress = getProgress();
  if (progress.favoritePhases.includes(phaseId)) {
    progress.favoritePhases = progress.favoritePhases.filter((id) => id !== phaseId);
  } else {
    progress.favoritePhases.push(phaseId);
  }
  saveProgress(progress);
};

// salva um exercicio no historico
// guarda no maximo os ultimos 30
export const addToHistory = (entry: HistoryEntry): void => {
  const progress = getProgress();
  progress.history.unshift(entry);
  if (progress.history.length > 30) {
    progress.history = progress.history.slice(0, 30);
  }
  saveProgress(progress);
};

// salva uma resposta errada pra revisao depois
export const addWrongAnswer = (wrong: WrongAnswer): void => {
  const progress = getProgress();
  // nao duplica a mesma pergunta
  const jaExiste = progress.wrongAnswers.some((w) => w.question === wrong.question);
  if (!jaExiste) {
    progress.wrongAnswers.push(wrong);
  }
  saveProgress(progress);
};

// remove uma resposta errada (quando o usuario acerta na revisao)
export const removeWrongAnswer = (question: string): void => {
  const progress = getProgress();
  progress.wrongAnswers = progress.wrongAnswers.filter((w) => w.question !== question);
  saveProgress(progress);
};

// calcula o nivel do usuario (a cada 500 xp sobe 1 nivel)
export const getLevel = (totalXP: number): number => {
  return Math.floor(totalXP / 500) + 1;
};
// sincroniza o progresso local com o supabase
// salva no banco pra nao perder se trocar de navegador
export const syncToSupabase = async (): Promise<void> => {
  if (!supabase) return; // sem supabase configurado, nao sincroniza
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return; // se nao ta logado nao sincroniza

  const progress = getProgress();

  // tenta atualizar, se nao existir cria
  const { error } = await supabase
    .from("progress")
    .upsert({
      user_id: user.id,
      total_xp: progress.totalXP,
      completed_phases: progress.completedPhases,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  if (error) {
    console.log("erro ao sincronizar:", error.message);
  }

  // atualiza o nome na tabela users tambem
  await supabase
    .from("users")
    .update({ name: progress.userName })
    .eq("id", user.id);
};
// carrega progresso do supabase quando o usuario loga
// se tiver dados no banco, atualiza o localStorage
export const loadFromSupabase = async (): Promise<void> => {
  if (!supabase) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !data) return;

  // pega o progresso local
  const local = getProgress();

  // usa o maior xp entre local e banco
  // e junta as fases completadas dos dois
  const merged: Progress = {
    userName: local.userName,
    totalXP: Math.max(local.totalXP, data.total_xp || 0),
    completedPhases: [
      ...new Set([...local.completedPhases, ...(data.completed_phases || [])])
    ],
    favoritePhases: local.favoritePhases || [],
    history: local.history || [],
     wrongAnswers: local.wrongAnswers || [],
  };

  saveProgress(merged);
};