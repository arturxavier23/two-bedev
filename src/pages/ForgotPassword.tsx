import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileShell from "@/components/MobileShell";
import { supabase } from "@/lib/supabase";

// tela de recuperar senha
// envia um email pro usuario com link pra redefinir
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  // envia o email de recuperacao
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErro("Preencha o e-mail");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErro("E-mail inválido");
      return;
    }

    if (supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });
      if (error) {
        setErro("Erro ao enviar e-mail: " + error.message);
        return;
      }
    }

    setErro("");
    setEnviado(true);
  };

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col px-6 pt-10 pb-8">
        <button onClick={() => navigate("/login")} className="text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-xl font-bold">Recuperar Senha</h1>
            <p className="text-xs text-muted-foreground text-center">
              Digite seu e-mail e enviaremos um link para redefinir sua senha
            </p>
          </div>

          {enviado ? (
            <div className="text-center">
              <p className="text-green-400 text-sm mb-4">
                E-mail enviado! Verifique sua caixa de entrada.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:underline text-sm"
              >
                Voltar para o login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">E-mail</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 bg-surface-1 border-border/60 text-sm"
                />
              </div>
              {erro && (
                <p className="text-red-500 text-xs text-center">{erro}</p>
              )}
              <Button className="h-11 mt-1 text-sm font-semibold btn-gradient text-primary-foreground border-0">
                Enviar Link
              </Button>
            </form>
          )}
        </div>
      </div>
    </MobileShell>
  );
};

export default ForgotPassword;