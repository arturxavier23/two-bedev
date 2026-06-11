import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileShell from "@/components/MobileShell";
import { supabase } from "@/lib/supabase";
import { loadFromSupabase } from "@/lib/progress";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

// valida os campos e faz login no supabase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErro("Preencha todos os campos");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErro("E-mail inválido");
      return;
    }

    // tenta fazer login no supabase
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErro("E-mail ou senha incorretos");
        return;
      }
    }

    setErro("");
    // carrega o progresso do banco antes de ir pro home
    await loadFromSupabase();
    navigate("/home");
  };

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col px-6 pt-10 pb-8">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 glow-purple">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Entrar</h1>
            <p className="text-xs text-muted-foreground">Continue sua jornada de aprendizado</p>
          </div>

          <form onSubmit={handleLogin} noValidate className="flex flex-col gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">E-mail</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 bg-surface-1 border-border/60 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 bg-surface-1 border-border/60 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
              />
            </div>
            {/* mensagem de erro */}
            {erro && (
              <p className="text-red-500 text-xs text-center">{erro}</p>
            )}
            <Button type="submit" className="h-11 mt-1 text-sm font-semibold btn-gradient text-primary-foreground border-0 glow-purple">
              Continuar
            </Button>
          </form>

          <div className="relative flex items-center justify-center my-1">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
            <span className="relative bg-background px-3 text-[10px] text-muted-foreground uppercase tracking-wider">ou</span>
          </div>

          <Button variant="outline" className="h-11 border-border/60 bg-surface-1 text-foreground text-sm hover:bg-surface-2">
            Continuar com Google
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-2">
            Não tem uma conta?{" "}
            <button className="text-primary hover:underline font-medium" onClick={() => navigate("/register")}>Criar conta</button>
          </p>
        </motion.div>
      </div>
    </MobileShell>
  );
};

export default Login;
