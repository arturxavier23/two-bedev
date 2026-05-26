import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileShell from "@/components/MobileShell";
import { updateUserName } from "@/lib/progress";

// tela de cadastro
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  // valida os campos antes de criar conta
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // verifica se os campos estao preenchidos
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErro("Preencha todos os campos");
      return;
    }

    // verifica formato basico do email
    if (!email.includes("@") || !email.includes(".")) {
      setErro("E-mail inválido");
      return;
    }

    // senha precisa ter pelo menos 6 caracteres
    if (password.length < 6) {
      setErro("Senha precisa ter pelo menos 6 caracteres");
      return;
    }

    setErro("");
    updateUserName(name);
    navigate("/home");
  };

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col px-6 pt-10 pb-8">
        <button onClick={() => navigate("/login")} className="text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-xl font-bold">Criar Conta</h1>
            <p className="text-xs text-muted-foreground">Comece sua jornada de aprendizado</p>
          </div>

          <form onSubmit={handleRegister} noValidate className="flex flex-col gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Nome</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="h-11 bg-surface-1 border-border/60 text-sm"
              />
            </div>
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
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 bg-surface-1 border-border/60 text-sm"
              />
            </div>
            {/* mensagem de erro */}
            {erro && (
              <p className="text-red-500 text-xs text-center">{erro}</p>
            )}
            <Button className="h-11 mt-1 text-sm font-semibold btn-gradient text-primary-foreground border-0">
              Criar Conta
            </Button>
          </form>
        </div>
      </div>
    </MobileShell>
  );
};

export default Register;