import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, Star } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { modulesData } from "@/data/modules";
import { phasesData } from "@/data/questions";
import { getProgress, toggleFavorite } from "@/lib/progress";

// tela de exercicios com filtro por categoria e favoritos
const Exercises = () => {
  const navigate = useNavigate();
  const progress = getProgress();

  // categoria selecionada (null = todas, -1 = favoritos)
  const [filtro, setFiltro] = useState<number | null>(null);

  // forca re-render quando favorita
  const [, setUpdate] = useState(0);

  // filtra as fases pela categoria ou favoritos
  const fasesFiltradas = filtro === -1
    ? phasesData.filter((p) => progress.favoritePhases?.includes(p.phaseId))
    : filtro
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
          <button
            onClick={() => setFiltro(-1)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              filtro === -1
                ? "bg-yellow-500 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            ⭐ Favoritos ({progress.favoritePhases?.length || 0})
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
            // verifica se ta nos favoritos
            const favorita = progress.favoritePhases?.includes(fase.phaseId);
            // acha o modulo dessa fase pra pegar o slug
            const mod = modulesData.find((m) => m.id === fase.moduleId);
            // calcula o indice da fase dentro do modulo
            const fasesDoMod = phasesData.filter((p) => p.moduleId === fase.moduleId);
            const index = fasesDoMod.indexOf(fase) + 1;

            return (
              <div
                key={fase.phaseId}
                onClick={() => navigate(`/lesson/${mod?.slug}/${index}`)}
                className="w-full flex items-center gap-3 rounded-xl bg-slate-800 p-3 text-left cursor-pointer"
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(fase.phaseId);
                    setUpdate((prev) => prev + 1);
                  }}
                  className="p-1"
                >
                  <Star
                    className={`h-4 w-4 ${favorita ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
};

export default Exercises;