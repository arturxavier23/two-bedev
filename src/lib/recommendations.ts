import { modulesData } from "@/data/modules";
import { phasesData } from "@/data/questions";
import { getProgress } from "@/lib/progress";

// tipo da recomendacao
export type Recommendation = {
  title: string;
  description: string;
  link: string;
};

// gera recomendacao baseada no progresso do usuario
export const getRecommendation = (): Recommendation => {
  const progress = getProgress();

  // percorre cada modulo pra achar onde o usuario parou
  for (const mod of modulesData) {
    const fases = phasesData.filter((p) => p.moduleId === mod.id);

    for (let i = 0; i < fases.length; i++) {
      // acha a primeira fase que o usuario nao completou
      if (!progress.completedPhases.includes(fases[i].phaseId)) {
        return {
          title: fases[i].title,
          description: `Continue no módulo ${mod.title}`,
          link: `/lesson/${mod.slug}/${i + 1}`,
        };
      }
    }
  }

  // se completou tudo
  return {
    title: "Parabéns!",
    description: "Você completou todos os exercícios",
    link: "/exercises",
  };
};