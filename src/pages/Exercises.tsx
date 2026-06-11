import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { modulesData } from "@/data/modules";
import { phasesData } from "@/data/questions";
import { getProgress } from "@/lib/progress";

// tela de exercicios com filtro por categoria
const Exercises = () => {
  const navigate = useNavigate();
  const progress = getProgress();

  // categoria selecionada (null = todas)
  const [filtro, setFiltro] = useState<number | null>(null);

  // filtra as fases pela categoria selecionada
  const fasesFiltradas = filtro
    ? phasesData.filter((p) => p.moduleId === filtro)
    : phasesData;

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col bg-slate-950 pb-16">
        {/* header */}
        <div className="px-5 pt-10 pb-3 flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            Exercícios
          </h1>
        </div>

        {/* botoes de filtro */}
        <div className="px-5 mb-4 flex gap-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setFiltro(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filtro === null
                ? "bg-primary text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            Todas ({phasesData.length})
          </button>
          {modulesData.map((mod) => {
            const total = phasesData.filter((p) => p.moduleId === mod.id).length;
            return (
              <button
                key={mod.id}
                onClick={() => setFiltro(mod.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  filtro === mod.id
                    ? "bg-primary text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {mod.title.split(" ")[0]} ({total})
              </button>
            );
          })}
        </div>

        {/* lista de exercicios */}
        <div className="px-5 space-y-2">
          {fasesFiltradas.map((fase) => {
            // verifica se a fase ja foi completada
            const completa = progress.completedPhases.includes(fase.phaseId);
            // acha o modulo dessa fase pra pegar o slug
            const mod = modulesData.find((m) => m.id === fase.moduleId);
            // calcula o indice da fase dentro do modulo
            const fasesDoMod = phasesData.filter((p) => p.moduleId === fase.moduleId);
            const index = fasesDoMod.indexOf(fase) + 1;

            return (
              <button
                key={fase.phaseId}
                onClick={() => navigate(`/lesson/${mod?.slug}/${index}`)}
                className="w-full flex items-center gap-3 rounded-xl bg-slate-800 p-3 text-left"
              >
                <span className="text-lg">
                  {completa ? "✅" : "📝"}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{fase.title}</p>
                  <p className="text-xs text-slate-400">
                    {mod?.title} • {fase.questions.length} perguntas
                  </p>
                </div>
                <span className="text-xs text-slate-500">
                  {completa ? "Feito" : "Jogar"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
};

export default Exercises;