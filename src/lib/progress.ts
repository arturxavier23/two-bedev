// sistema de progresso do usuario
// salva tudo no localStorage do navegador por enquanto
// depois vamos migrar pro supabase
import { supabase } from "@/lib/supabase";
const KEY = "two_be_dev_progress";

export type Progress = {
  userName: string;
  totalXP: number;
  completedPhases: number[];
};

// valores iniciais quando o usuario abre o app pela primeira vez
const defaultProgress: Progress = {
  userName: "Aluno",
  totalXP: 0,
  completedPhases: [],
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

// calcula o nivel do usuario (a cada 500 xp sobe 1 nivel)
export const getLevel = (totalXP: number): number => {
  return Math.floor(totalXP / 500) + 1;
};
// sincroniza o progresso local com o supabase
// salva no banco pra nao perder se trocar de navegador
export const syncToSupabase = async (): Promise<void> => {
  // verifica se o usuario ta logado
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
};