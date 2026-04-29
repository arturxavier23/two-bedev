import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileShell from "@/components/MobileShell";
import { getModuleTheme } from "@/lib/moduleThemes";

const questions = [
  {
    question: 'What does "PR" stand for in a Git workflow?',
    options: ["Pull Request", "Push Release", "Project Repository", "Primary Run"],
    correct: 0,
  },
  {
    question: 'What does the keyword "const" mean?',
    options: ["A constant variable", "A constructor", "A container", "A conditional"],
    correct: 0,
  },
  {
    question: 'What HTTP method is used to update a resource?',
    options: ["GET", "POST", "PUT", "DELETE"],
    correct: 2,
  },
];

const Lesson = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const id = moduleId || "git";
  const theme = getModuleTheme(id);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];
  const isCorrect = selected === q.correct;
  const progress = ((currentQ + (submitted ? 1 : 0)) / questions.length) * 100;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const xpEarned = score * 15;
    return (
      <MobileShell>
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-5">
            <div
              className="flex h-16 w-16 mx-auto items-center justify-center rounded-full"
              style={{ backgroundColor: `${theme.bg}1a`, boxShadow: theme.glowShadow }}
            >
              <Zap className="h-8 w-8" style={{ color: theme.text }} />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-1">Lição Concluída!</h1>
              <p className="text-muted-foreground text-xs">{score}/{questions.length} corretas</p>
            </div>
            <div className="flex items-center justify-center gap-2" style={{ color: theme.text }}>
              <Zap className="h-5 w-5" />
              <span className="text-2xl font-bold">+{xpEarned} XP</span>
            </div>
            <Button
              onClick={() => navigate(`/module/${id}`)}
              className="w-full max-w-[220px] h-11 font-semibold text-sm border-0 text-primary-foreground"
              style={{ background: `linear-gradient(135deg, ${theme.bg}, ${theme.bg}cc)` }}
            >
              Voltar ao Módulo
            </Button>
          </motion.div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col">
        <div className="px-5 pt-5 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(`/module/${id}`)} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
          <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: theme.bg }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">{currentQ + 1}/{questions.length}</span>
        </div>

        <div className="flex-1 px-5 pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="space-y-5"
            >
              <h2 className="text-base font-semibold leading-relaxed">{q.question}</h2>

              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  let borderStyle: React.CSSProperties = {};
                  let bg = "bg-surface-1";

                  if (submitted) {
                    if (i === q.correct) {
                      borderStyle = { borderColor: `${theme.bg}99` };
                      bg = "";
                    } else if (i === selected && !isCorrect) {
                      borderStyle = {};
                      bg = "bg-destructive/5";
                    }
                  } else if (i === selected) {
                    borderStyle = { borderColor: `${theme.bg}99` };
                    bg = "";
                  }

                  const isSelectedCorrect = submitted && i === q.correct;
                  const isSelectedWrong = submitted && i === selected && !isCorrect && i !== q.correct;

                  return (
                    <button
                      key={i}
                      disabled={submitted}
                      onClick={() => setSelected(i)}
                      className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium transition-all border-border/50 ${bg}`}
                      style={{
                        ...borderStyle,
                        ...(isSelectedCorrect ? { backgroundColor: `${theme.bg}0d` } : {}),
                        ...(!submitted && i === selected ? { backgroundColor: `${theme.bg}0d` } : {}),
                      }}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-2 text-[10px] font-bold text-muted-foreground">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-xs">{opt}</span>
                      {isSelectedCorrect && <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: theme.text }} />}
                      {isSelectedWrong && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-5 pb-6 pt-3">
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-2.5 mb-3 text-xs font-medium text-center"
              style={
                isCorrect
                  ? { backgroundColor: `${theme.bg}1a`, color: theme.text }
                  : { backgroundColor: "hsl(0 60% 50% / 0.1)", color: "hsl(0 60% 50%)" }
              }
            >
              {isCorrect ? "Correto! 🎉" : "Quase lá. Continue! 💪"}
            </motion.div>
          )}
          <Button
            onClick={submitted ? handleNext : handleSubmit}
            disabled={selected === null && !submitted}
            className="w-full h-11 text-sm font-semibold text-primary-foreground border-0 disabled:opacity-30"
            style={{ background: `linear-gradient(135deg, ${theme.bg}, ${theme.bg}cc)` }}
          >
            {submitted ? (currentQ < questions.length - 1 ? "Próxima" : "Finalizar") : "Verificar Resposta"}
          </Button>
        </div>
      </div>
    </MobileShell>
  );
};

export default Lesson;
