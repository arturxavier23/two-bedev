import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { getProgress } from "@/lib/progress";

// tela de historico dos ultimos 30 exercicios
const History = () => {
  const navigate = useNavigate();
  const progress = getProgress();
  const historico = progress.history || [];

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col bg-slate-950 pb-16">
        {/* header */}
        <div className="px-5 pt-10 pb-3 flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Histórico
          </h1>
        </div>

        {/* lista de exercicios feitos */}
        <div className="px-5 space-y-2">
          {historico.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              Nenhum exercício feito ainda
            </p>
          ) : (
            historico.map((entry, i) => {
              // calcula a porcentagem de acerto
              const porcentagem = Math.floor((entry.score / entry.total) * 100);

              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-slate-800 p-3"
                >
                  {/* emoji baseado na porcentagem */}
                  <span className="text-lg">
                    {porcentagem >= 80 ? "🏆" : porcentagem >= 60 ? "👍" : "📝"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{entry.phaseTitle}</p>
                    <p className="text-xs text-slate-400">
                      {entry.moduleName} • {entry.data}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">
                      {entry.score}/{entry.total}
                    </p>
                    <p className="text-xs text-green-400">+{entry.xpGanho} XP</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </MobileShell>
  );
};

export default History;