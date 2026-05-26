import { motion } from "framer-motion";
import { Zap, Trophy } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";
import { getProgress } from "@/lib/progress";

// tela de ranking
// dados dos outros usuarios sao fixos por enquanto
// quando tiver supabase vai puxar do banco
const Leaderboard = () => {
  // pega o xp real do usuario
  const progress = getProgress();

  // lista de usuarios com o xp real do usuario logado
  const users = [
    { name: "CyberNova", xp: 3420, avatar: "🧑‍💻" },
    { name: "DevMaster", xp: 2890, avatar: "👩‍💻" },
    { name: "CodePhoenix", xp: 2310, avatar: "🦊" },
    { name: "ByteRunner", xp: 1980, avatar: "🚀" },
    { name: progress.userName, xp: progress.totalXP, avatar: "⚡", isUser: true },
    { name: "PixelDev", xp: 1100, avatar: "🎮" },
    { name: "StackOwl", xp: 890, avatar: "🦉" },
    { name: "NullPointer", xp: 650, avatar: "💀" },
  ]
    // ordena por xp do maior pro menor
    .sort((a, b) => b.xp - a.xp);

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col pb-16">
        <div className="px-5 pt-10 pb-5">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Ranking
          </h1>
        </div>

        <div className="px-5 space-y-1.5">
          {users.map((user, i) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors
                ${(user as any).isUser
                  ? "border-primary/25 bg-primary/5"
                  : "border-border/50 bg-surface-1"
                }`}
            >
              <span className={`w-5 text-center text-xs font-bold ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>
                {i + 1}
              </span>
              <span className="text-base">{user.avatar}</span>
              <span className={`flex-1 text-xs font-semibold ${(user as any).isUser ? "text-primary" : ""}`}>
                {user.name}
              </span>
              <div className="flex items-center gap-1 text-primary">
                <Zap className="h-3 w-3" />
                <span className="text-xs font-semibold">{user.xp.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default Leaderboard;
