import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileShell from "@/components/MobileShell";

// tela de cadastro
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

          <div className="flex flex-col gap-3.5">
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

            <Button className="h-11 mt-1 text-sm font-semibold btn-gradient text-primary-foreground border-0">
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default Register;