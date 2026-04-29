// sistema de progresso do usuario
// salva tudo no localStorage do navegador por enquanto
// depois vamos migrar pro supabase

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

// adiciona xp quando o usuario acerta questoes
export const addXP = (xp: number): void => {
  const progress = getProgress();
  progress.totalXP += xp;
  saveProgress(progress);
};

// marca uma fase como completa
export const completePhase = (phaseId: number): void => {
  const progress = getProgress();
  if (!progress.completedPhases.includes(phaseId)) {
    progress.completedPhases.push(phaseId);
  }
  saveProgress(progress);
};

// calcula o nivel do usuario (a cada 1000 xp sobe 1 nivel)
export const getLevel = (totalXP: number): number => {
  return Math.floor(totalXP / 1000) + 1;
};
