import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Trophy } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";
import { supabase } from "@/lib/supabase";
import { getProgress } from "@/lib/progress";

// tela de ranking
// tipo dos dados do ranking
type RankUser = {
  name: string;
  xp: number;
  isUser: boolean;
};

// tela de ranking - puxa dados reais do supabase
const Leaderboard = () => {
  const [users, setUsers] = useState<RankUser[]>([]);
  const [carregando, setCarregando] = useState(true);

  // busca o ranking quando a tela abre
  useEffect(() => {
    const fetchRanking = async () => {
      if (!supabase) {
        // sem supabase, mostra so o usuario local
        const progress = getProgress();
        setUsers([{ name: progress.userName, xp: progress.totalXP, isUser: true }]);
        setCarregando(false);
        return;
      }

      // pega o usuario logado
      const { data: { user } } = await supabase.auth.getUser();

      // busca todos os progressos com o nome do usuario
      const { data, error } = await supabase
        .from("progress")
        .select("user_id, total_xp, users(name)")
        .order("total_xp", { ascending: false })
        .limit(10);

      if (error || !data) {
        // se deu erro mostra so o usuario local
        const progress = getProgress();
        setUsers([{ name: progress.userName, xp: progress.totalXP, isUser: true }]);
        setCarregando(false);
        return;
      }

      // transforma os dados no formato que a tela precisa
      const ranking: RankUser[] = data.map((item: any) => ({
        name: (item.users as any)?.name || "Usuário",
        xp: item.total_xp || 0,
        isUser: item.user_id === user?.id,
      }));

      setUsers(ranking);
      setCarregando(false);
    };

    fetchRanking();
  }, []);

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
          {carregando ? (
            <p className="text-sm text-muted-foreground text-center py-10">Carregando ranking...</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">Nenhum jogador ainda</p>
          ) : (
            users.map((user, i) => (
              <motion.div
                key={user.name + i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors
                  ${user.isUser
                    ? "border-primary/25 bg-primary/5"
                    : "border-border/50 bg-surface-1"
                  }`}
              >
                <span className={`w-5 text-center text-xs font-bold ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>
                  {i + 1}
                </span>
                <span className="text-base">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "⚡"}
                </span>
                <span className={`flex-1 text-xs font-semibold ${user.isUser ? "text-primary" : ""}`}>
                  {user.name}
                </span>
                <div className="flex items-center gap-1 text-primary">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-semibold">{user.xp.toLocaleString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
};

export default Leaderboard;
