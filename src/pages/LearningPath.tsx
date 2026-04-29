import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";
import { getModuleTheme } from "@/lib/moduleThemes";
import { modulesData } from "@/data/modules";
import { phasesData } from "@/data/questions";
import { getProgress } from "@/lib/progress";


const LearningPath = () => {
  const navigate = useNavigate();
  // pega o progresso do usuario
const progress = getProgress();

//monta a lista de modulos com progresso real
const modules = modulesData.map((mod, index) => {
  const fases = phasesData.filter((p) => p.moduleId === mod.id);
  // consta quases fases desse modulo o usuario ja completou 
  const completed = fases.filter((f) => progress.completedPhases.includes(f.phaseId)).length;

  // modulo so desbloqueia se o anterior estiver completo
  let locked = false;
  if (index> 0){
    const fasesAnterior = phasesData.filter((p) => p.moduleId === modulesData[index - 1].id);
    const completouAnterior = fasesAnterior.filter((f) => progress.completedPhases.includes(f.phaseId)).length;
    locked = completouAnterior < fasesAnterior.length;
  }

  return{
    id: mod.slug,
    title: mod.title,
    lessons: fases.length,
    completed,
    xp: fases.length * 100,
    status: locked ? "locked" : completed === fases.length ? "completed" : "active",
  };
  });

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col pb-16">
        <div className="px-5 pt-10 pb-5 flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">Trilha de Aprendizado</h1>
        </div>

        <div className="px-5 space-y-2.5">
          {modules.map((mod, i) => {
            const isLocked = mod.status === "locked";
            const isCompleted = mod.status === "completed";
            const progress = mod.lessons > 0 ? (mod.completed / mod.lessons) * 100 : 0;
            const theme = getModuleTheme(mod.id);
            const earnedXp = mod.completed * 100;

            return (
              <motion.button
                key={mod.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                disabled={isLocked}
                onClick={() => !isLocked && navigate(`/module/${mod.id}`)}
                className={`w-full flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all
                  ${isLocked
                    ? "border-border/40 bg-surface-1/40 opacity-40 cursor-not-allowed"
                    : "bg-surface-1 hover:bg-surface-2"
                  }`}
                style={!isLocked ? { borderColor: theme.border } : undefined}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isLocked ? "bg-surface-2" : ""}`}
                  style={!isLocked ? {
                    background: `linear-gradient(135deg, ${theme.bg}20, ${theme.bg}08)`,
                    boxShadow: mod.status === "active" ? `0 0 12px ${theme.bg}25` : undefined,
                  } : undefined}
                >
                  {isLocked ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="h-4.5 w-4.5" style={{ color: theme.text }} />
                  ) : (
                    <Zap className="h-4.5 w-4.5" style={{ color: theme.text}}/>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold truncate">{mod.title}</p>
                    {!isLocked && (
                      <span className="flex items-center gap-0.5 text-[10px] font-medium shrink-0" style={{ color: theme.text }}>
                        <Zap className="h-2.5 w-2.5" />
                        {earnedXp}/{mod.xp}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="h-1.5 flex-1 rounded-full bg-surface-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all bg-gradient-to-r ${isLocked ? "bg-muted" : theme.gradient}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">{mod.completed}/{mod.lessons}</span>
                  </div>
                </div>

                {!isLocked && <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />}
              </motion.button>
            );
          })}
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default LearningPath;
