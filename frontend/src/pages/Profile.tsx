import { motion } from "framer-motion";
import { Zap, Flame, BookOpen, Award, Settings } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";

const stats = [
  { icon: Zap, label: "XP Total", value: "1.240", color: "text-primary" },
  { icon: Flame, label: "Sequência", value: "7 dias", color: "text-accent" },
  { icon: BookOpen, label: "Lições", value: "12", color: "text-neon-cyan" },
  { icon: Award, label: "Conquistas", value: "4", color: "text-primary" },
];

const achievements = [
  { title: "Primeira Lição", emoji: "🎯", unlocked: true },
  { title: "7 Dias Seguidos", emoji: "🔥", unlocked: true },
  { title: "Mestre do Módulo", emoji: "⭐", unlocked: true },
  { title: "Velocista", emoji: "⚡", unlocked: true },
  { title: "Poliglota", emoji: "🌍", unlocked: false },
  { title: "Perfeccionista", emoji: "💎", unlocked: false },
];

const Profile = () => {
  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col pb-16">
        <div className="px-5 pt-10 pb-5 flex items-center justify-between">
          <h1 className="text-lg font-bold">Perfil</h1>
          <button className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {/* Avatar & Name */}
        <div className="px-5 mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xl">
            ⚡
          </div>
          <div>
            <p className="text-base font-bold">Desenvolvedor</p>
            <p className="text-xs text-muted-foreground">Nível 5 • Iniciante</p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 mb-5 grid grid-cols-2 gap-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2.5 rounded-xl bg-surface-1 border border-border/60 p-3"
            >
              <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
              <div>
                <p className="text-sm font-bold">{stat.value}</p>
                <p className="text-[9px] text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="px-5">
          <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Conquistas</h2>
          <div className="grid grid-cols-3 gap-2">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`flex flex-col items-center gap-1 rounded-xl border p-2.5
                  ${a.unlocked ? "border-border/60 bg-surface-1" : "border-border/30 bg-surface-1/30 opacity-35"}`}
              >
                <span className="text-lg">{a.emoji}</span>
                <span className="text-[8px] font-medium text-center leading-tight text-muted-foreground">{a.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default Profile;
