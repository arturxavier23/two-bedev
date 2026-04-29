import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock, Play } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { getModuleTheme } from "@/lib/moduleThemes";
import { modulesData } from "@/data/modules";
import { phasesData } from "@/data/questions";
import { getProgress } from "@/lib/progress";

const REF_WIDTH = 390;
const NODE_SIZE_CURRENT = 80;
const NODE_SIZE_COMPLETED = 66;
const NODE_SIZE_LOCKED = 58;
const Y_SPACING = 220;
const TOP_PAD = 110;

const getNodePosition = (index: number, total: number) => {
  const pattern = [0.40, 0.50, 0.60, 0.50];
  const xFrac = pattern[index % pattern.length];
  return {
    px: xFrac * REF_WIDTH,
    py: TOP_PAD + index * Y_SPACING,
    xPct: xFrac * 100,
    totalHeight: TOP_PAD + (total - 1) * Y_SPACING + 180,
  };
};

const ModuleMap = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const id = moduleId || "js";
  
  const theme = getModuleTheme(id);
  // acha modulo pelo slug e pega as fases dele
  const modulo = modulesData.find((m) => m.slug === id);
  const fases = phasesData.filter((p) => p.moduleId === modulo?.id )

  // pega progresso pra saber quais fases ja foram feitas
  const progress = getProgress();
  // monta no formato que o mapa precisa com status real
  const data = {
    title: modulo?.title || "Módulo",
    lessons: fases.map((fase, index) => {
      //verifica se essa fase ja foi completada
      const completed = progress.completedPhases.includes(fase.phaseId);

      // fase anterior precisa estar completa para desbloquear
      const anteriorCompleta = index === 0 || progress.completedPhases.includes(fases[index - 1].phaseId);
      
      let status: "completed" | "current" | "locked" = "locked";
      if(completed){
        status = "completed";
      } else if (anteriorCompleta){
        status = "current";
      }
      return {
        id: index + 1,
        title: fase.title,
        status,
      };
    }),
  };
  const completedCount = data.lessons.filter(l => l.status === "completed").length;
  const positions = data.lessons.map((_, i) => getNodePosition(i, data.lessons.length));
  const totalHeight = positions.length > 0 ? positions[positions.length - 1].totalHeight : 400;

  // Build SVG path that goes straight through each node, curving only between them
  const buildPath = () => {
    if (positions.length < 2) return "";
    let d = `M ${positions[0].px} ${positions[0].py}`;
    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1];
      const curr = positions[i];
      // Control points: keep x at previous/current node x, y at midpoint
      const midY = (prev.py + curr.py) / 2;
      d += ` C ${prev.px} ${midY}, ${curr.px} ${midY}, ${curr.px} ${curr.py}`;
    }
    return d;
  };

  const fullPath = buildPath();

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-lg border-b border-border/60 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/learning-path")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold truncate">{data.title}</h1>
            <p className="text-[10px] text-muted-foreground">{completedCount}/{data.lessons.length} lições concluídas</p>
          </div>
        </div>

        {/* Map */}
        <div className="relative w-full overflow-hidden" style={{ height: totalHeight }}>
          {/* SVG Path */}
          <svg className="absolute inset-0 w-full" style={{ height: totalHeight }}>
            <defs>
              <linearGradient id={`pathGrad-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.bg} stopOpacity={0.8} />
                <stop offset="100%" stopColor={theme.bg} stopOpacity={0.3} />
              </linearGradient>
              <filter id={`glowPath-${id}`}>
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background (locked) path */}
            <path
              d={fullPath}
              fill="none"
              stroke="hsl(228 15% 18%)"
              strokeWidth={2}
              strokeDasharray="6 5"
              strokeLinecap="round"
              opacity={0.3}
            />

            {/* Active path up to current/completed */}
            {(() => {
              const lastActiveIdx = data.lessons.findIndex(l => l.status === "current");
              const activeEnd = lastActiveIdx >= 0 ? lastActiveIdx : completedCount - 1;
              if (activeEnd < 1) return null;

              let d = `M ${positions[0].px} ${positions[0].py}`;
              for (let i = 1; i <= activeEnd; i++) {
                const prev = positions[i - 1];
                const curr = positions[i];
                const midY = (prev.py + curr.py) / 2;
                d += ` C ${prev.px} ${midY}, ${curr.px} ${midY}, ${curr.px} ${curr.py}`;
              }

              return (
                <path
                  d={d}
                  fill="none"
                  stroke={`url(#pathGrad-${id})`}
                  strokeWidth={3}
                  strokeLinecap="round"
                  filter={`url(#glowPath-${id})`}
                />
              );
            })()}
          </svg>

          {/* Nodes */}
          {data.lessons.map((lesson, i) => {
            const pos = positions[i];
            const isCompleted = lesson.status === "completed";
            const isCurrent = lesson.status === "current";
            const isLocked = lesson.status === "locked";
            const xp = 100;

            const nodeSize = isCurrent ? NODE_SIZE_CURRENT : isCompleted ? NODE_SIZE_COMPLETED : NODE_SIZE_LOCKED;

            return (
              <motion.button
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
                disabled={isLocked}
                onClick={() => !isLocked && navigate(`/lesson/${id}/${lesson.id}`)}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${pos.xPct}%`,
                  top: pos.py,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Node circle */}
                <div className="relative flex-shrink-0">
                  {isCurrent && (
                    <>
                      <motion.div
                        className="absolute rounded-full"
                        style={{ backgroundColor: `${theme.bg}1a`, inset: -12 }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute rounded-full"
                        style={{ backgroundColor: `${theme.bg}33`, inset: -6 }}
                        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 0.5, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      />
                    </>
                  )}
                  <div
                    className="relative flex items-center justify-center rounded-full border-2 transition-all"
                    style={{
                      width: nodeSize,
                      height: nodeSize,
                      ...(isCompleted
                        ? { borderColor: `${theme.bg}80`, backgroundColor: `${theme.bg}26`, boxShadow: theme.glowShadow }
                        : isCurrent
                          ? { borderColor: theme.bg, backgroundColor: `${theme.bg}33`, boxShadow: theme.strongGlow }
                          : { borderColor: "hsl(228 15% 16% / 0.3)", backgroundColor: "hsl(228 18% 14% / 0.4)" }),
                    }}
                  >
                    {isCompleted ? (
                      <Check className="h-7 w-7" style={{ color: theme.text }} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play className="h-8 w-8 ml-0.5" style={{ color: theme.text }} fill={theme.bg} />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground/40" />
                    )}
                  </div>
                </div>

                {/* Label below node */}
                <div className={`flex flex-col items-center text-center mt-4 gap-0.5 ${isLocked ? "opacity-20" : ""}`}>
                  <span
                    className="text-[8px] uppercase tracking-[0.15em] font-medium"
                    style={{ color: isCurrent ? `${theme.bg}b3` : isCompleted ? `${theme.bg}66` : undefined }}
                  >
                    Nível {i + 1}
                  </span>
                  <span className={`text-[13px] font-semibold leading-snug max-w-[110px] mt-0.5 ${isCurrent ? "text-foreground" : isCompleted ? "text-foreground/70" : "text-muted-foreground/30"}`}>
                    {lesson.title}
                  </span>
                  <span
                    className="text-[10px] font-mono mt-1"
                    style={{ color: isCompleted ? `${theme.bg}80` : isCurrent ? `${theme.bg}cc` : undefined }}
                  >
                    +{xp} XP
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
};

export default ModuleMap;
