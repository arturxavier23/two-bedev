import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Flame, BookOpen, Award, Settings, Share2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";
import { getProgress, getLevel, updateUserName } from "@/lib/progress";
import { supabase } from "@/lib/supabase";
// Tela de perfil do usuário
const Profile = () => {
  // Pega dados reais do usuário
  const progress = getProgress();
  const nivel = getLevel(progress.totalXP);
  // controla se ta editando o nome ou nao
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(progress.userName);
  

  // salva o nome no localStorage e no supabase
  const handleSalvar = async () => {
    if (!novoNome.trim()) return;
    updateUserName(novoNome);
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("users").update({ name: novoNome }).eq("id", user.id);
      }
    }
    setEditando(false);
  };
  // compartilha o progresso do usuario
  const handleCompartilhar = () => {
    const texto = `🎮 Estou no nível ${nivel} no Two-BeDev! Já completei ${progress.completedPhases.length} lições e tenho ${progress.totalXP} XP. Bora aprender inglês técnico? 🚀`;
    window.prompt("Copie e compartilhe seu progresso:", texto);
  };

  // Estatísticas com dados reais do localStorage
  const stats = [
    {
      icon: Zap,
      label: "XP Total",
      value: progress.totalXP.toLocaleString("pt-BR"),
      color: "text-primary",
    },
    {
      icon: Flame,
      label: "Sequência",
      value: "7 dias",
      color: "text-accent",
    },
    {
      icon: BookOpen,
      label: "Lições",
      value: String(progress.completedPhases.length),
      color: "text-neon-cyan",
    },
    {
      icon: Award,
      label: "Nível",
      value: String(nivel),
      color: "text-primary",
    },
  ];

  // Conquistas desbloqueiam baseado no progresso real
  const achievements = [
    {
      title: "Primeira Lição",
      emoji: "🎯",
      unlocked: progress.completedPhases.length >= 1,
    },
    {
      title: "5 Lições",
      emoji: "📚",
      unlocked: progress.completedPhases.length >= 5,
    },
    {
      title: "Nível 3",
      emoji: "⭐",
      unlocked: nivel >= 3,
    },
    {
      title: "500 XP",
      emoji: "⚡",
      unlocked: progress.totalXP >= 500,
    },
    {
      title: "Módulo Completo",
      emoji: "🏆",
      unlocked: progress.completedPhases.length >= 5,
    },
    {
      title: "Mestre",
      emoji: "💎",
      unlocked: progress.completedPhases.length >= 20,
    },
  ];

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col pb-16">
        <div className="px-5 pt-10 pb-5 flex items-center justify-between">
          <h1 className="text-lg font-bold">Perfil</h1>

          <button onClick={() => setEditando(!editando)} className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {/* Nome e nível do usuário */}
        <div className="px-5 mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xl">
            ⚡
          </div>

          <div className="flex-1">
            {editando ? (
              <div className="flex gap-2">
                <input
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="bg-surface-1 border border-border/60 rounded-lg px-2 py-1 text-sm text-white"
                />
                <button onClick={handleSalvar} className="text-xs text-primary font-medium">
                  Salvar
                </button>
                <button onClick={() => setEditando(false)} className="text-xs text-muted-foreground">
                  Cancelar
                </button>
              </div>
            ) : (
              <p className="text-base font-bold">{progress.userName}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Nível {nivel} •{" "}
              {nivel <= 2
                ? "Iniciante"
                : nivel <= 5
                ? "Desenvolvedor Júnior"
                : "Desenvolvedor Pleno"}
            </p>
          </div>
        </div>

        {/* Cards de estatísticas */}
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
                <p className="text-[9px] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
          {/* botao de compartilhar */}
        <div className="px-5 mb-5">
          <button
            onClick={handleCompartilhar}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/20 p-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Compartilhar Progresso
          </button>
        </div>
        {/* Conquistas */}
        <div className="px-5">
          <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
            Conquistas
          </h2>

          <div className="grid grid-cols-3 gap-2">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 ${
                  achievement.unlocked
                    ? "border-border/60 bg-surface-1"
                    : "border-border/30 bg-surface-1/30 opacity-35"
                }`}
              >
                <span className="text-lg">{achievement.emoji}</span>
                <span className="text-[8px] font-medium text-center leading-tight text-muted-foreground">
                  {achievement.title}
                </span>
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