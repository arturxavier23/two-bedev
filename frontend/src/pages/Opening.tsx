import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileShell from "@/components/MobileShell";

const Opening = () => {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 glow-purple">
            <Terminal className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-glow-purple">
              <span className="text-primary">Two</span>
              <span className="text-foreground">-BeDev</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-[240px]">
              Domine o inglês técnico para devs — uma lição por vez.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[260px] mt-4">
            <Button
              onClick={() => navigate("/login")}
              className="w-full h-11 text-sm font-semibold btn-gradient text-primary-foreground border-0 glow-purple"
            >
              Começar
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Já tenho uma conta
            </Button>
          </div>
        </motion.div>

        <p className="absolute bottom-6 text-[10px] text-muted-foreground/40 font-mono">
          v1.0 — aprenda. code. evolua.
        </p>
      </div>
    </MobileShell>
  );
};

export default Opening;
