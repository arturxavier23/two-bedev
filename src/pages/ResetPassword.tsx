import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileShell from "@/components/MobileShell";
import { supabase } from "@/lib/supabase";

// tela pra definir nova senha
// o usuario chega aqui pelo link do email
const ResetPassword = () => {
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!novaSenha.trim() || !confirmar.trim()) {
      setErro("Preencha todos os campos");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("Senha precisa ter pelo menos 6 caracteres");
      return;
    }

    if (novaSenha !== confirmar) {
      setErro("As senhas não coincidem");
      return;
    }

    if (supabase) {
      const { error } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (error) {
        setErro("Erro ao atualizar senha: " + error.message);
        return;
      }
    }

    setSucesso(true);
  };

  if (sucesso) {
    return (
      <MobileShell>
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-5">
          <p className="text-4xl mb-4">✅</p>
          <h1 className="text-white text-xl font-bold mb-2">Senha atualizada!</h1>
          <p className="text-slate-400 text-sm mb-6">Agora você pode fazer login com a nova senha.</p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full"
          >
            Ir para Login
          </Button>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col px-6 pt-10 pb-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-xl font-bold">Nova Senha</h1>
            <p className="text-xs text-muted-foreground text-center">
              Digite sua nova senha abaixo
            </p>
          </div>

          <form onSubmit={handleReset} noValidate className="flex flex-col gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Nova senha</label>
              <Input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="••••••••"
                className="h-11 bg-surface-1 border-border/60 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Confirmar senha</label>
              <Input
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="••••••••"
                className="h-11 bg-surface-1 border-border/60 text-sm"
              />
            </div>
            {erro && (
              <p className="text-red-500 text-xs text-center">{erro}</p>
            )}
            <Button className="h-11 mt-1 text-sm font-semibold btn-gradient text-primary-foreground border-0">
              Atualizar Senha
            </Button>
          </form>
        </div>
      </div>
    </MobileShell>
  );
};

export default ResetPassword;