import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Zap, Target, ChevronRight, Trophy, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";
import { getProgress, getLevel } from "@/lib/progress";
import { getRecommendation } from "@/lib/recommendations";

const Home = () => {
  const navigate = useNavigate();

  // pega os dados reais do progresso do usuario
  const progress = getProgress();
  const currentLevel = getLevel(progress.totalXP);
  const currentXp = progress.totalXP;
  const xpDoNivel = currentXp % 500; // xp dentro do nivel atual
  const xpProgress = (xpDoNivel / 500) * 100;
  const streak = 7 ;
  // pega exercicio recomendado baseado no progresso
  const recomendacao = getRecommendation();

  // missoes diarias baseadas no progresso real
  const missions = [
    { title: "Complete 1 lição", progress: Math.min(progress.completedPhases.length, 1), total: 1, xp: 20 },
    { title: "Complete 3 lições", progress: Math.min(progress.completedPhases.length, 3), total: 3, xp: 30 },
    { title: "Ganhe 100 XP", progress: Math.min(progress.totalXP, 100), total: 100, xp: 50 },
  ];

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col pb-16">
        <div className="px-5 pt-8 pb-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">Bem-vindo de volta,</p>
              <h1 className="text-lg font-bold">{progress.userName}</h1>
            </div>
            {/* Streak badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3 py-1.5"
            >
              <Flame className="h-4 w-4 text-accent" />
              <span className="text-sm font-bold text-accent">{streak}</span>
              <span className="text-[9px] text-muted-foreground">dias</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Level & XP Progress */}
        <div className="px-5 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-xl bg-surface-1 border border-border/60 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/15 border border-primary/20">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Nível {currentLevel}</p>
                   <p className="text-[10px] text-muted-foreground">
                    {currentLevel <= 2 ? "Iniciante" : currentLevel <= 5 ? "Desenvolvedor Júnior" : "Desenvolvedor Pleno"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">{currentXp.toLocaleString("pt-BR")}</span>
                   <span className="text-[10px] text-muted-foreground">/ 500 XP</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
              <motion.div
                className="h-full rounded-full btn-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Main CTA */}
        <div className="px-5 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              onClick={() => navigate("/learning-path")}
              className="w-full h-14 text-sm font-semibold btn-gradient text-primary-foreground border-0 glow-purple flex flex-col items-center justify-center gap-0.5"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                Continuar Aprendizado
                <ChevronRight className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-normal opacity-80">Continue de onde parou</span>
            </Button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              onClick={() => navigate("/leaderboard")}
              className="flex items-center gap-3 rounded-xl bg-surface-1 border border-border/60 p-3 text-left hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-accent/10 border border-accent/20">
                <Trophy className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold">Ranking</p>
                <p className="text-[10px] text-muted-foreground">#12 posição</p>
              </div>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 rounded-xl bg-surface-1 border border-border/60 p-3 text-left hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 border border-primary/20">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold">Perfil</p>
                <p className="text-[10px] text-muted-foreground">{progress.completedPhases.length} lições</p>
              </div>
            </motion.button>
          </div>
        </div>
        {/* recomendacao personalizada */}
        <div className="px-5 mb-4">
          <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Recomendado pra você</h2>
          <button
            onClick={() => navigate(recomendacao.link)}
            className="w-full flex items-center gap-3 rounded-xl bg-primary/10 border border-primary/20 p-3 text-left hover:bg-primary/15 transition-colors"
          >
            <span className="text-lg">🎯</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{recomendacao.title}</p>
              <p className="text-xs text-muted-foreground">{recomendacao.description}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-primary" />
          </button>
        </div>
        {/* missoes diarias */}
        <div className="px-5">
          <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Missões Diárias</h2>
          <div className="space-y-2">
            {missions.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-center justify-between rounded-xl bg-surface-1 border border-border/60 p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{m.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="h-1.5 flex-1 rounded-full bg-surface-3 overflow-hidden">
                      <div
                        className="h-full rounded-full btn-gradient transition-all"
                        style={{ width: `${(m.progress / m.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-muted-foreground whitespace-nowrap">{m.progress}/{m.total}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-3 text-primary">
                  <Zap className="h-3 w-3" />
                  <span className="text-[10px] font-semibold">+{m.xp}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default Home;
