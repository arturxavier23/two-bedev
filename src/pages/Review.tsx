import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { getProgress, removeWrongAnswer } from "@/lib/progress";

// tela de revisao dos exercicios errados
// mostra a pergunta, o que o usuario respondeu e a resposta certa
const Review = () => {
  const navigate = useNavigate();
  const progress = getProgress();
  const [erros, setErros] = useState(progress.wrongAnswers || []);

  // remove o erro da lista quando o usuario clica "Entendi"
  const handleEntendi = (question: string) => {
    removeWrongAnswer(question);
    setErros((prev) => prev.filter((e) => e.question !== question));
  };

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col bg-slate-950 pb-16">
        {/* header */}
        <div className="px-5 pt-10 pb-3 flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-primary" />
            Revisão ({erros.length})
          </h1>
        </div>

        {/* lista de erros */}
        <div className="px-5 space-y-3">
          {erros.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-2xl mb-3">🎉</p>
              <p className="text-sm text-muted-foreground">
                Nenhum erro pra revisar! Continue praticando.
              </p>
            </div>
          ) : (
            erros.map((erro, i) => (
              <div key={i} className="rounded-xl bg-slate-800 p-4">
                {/* categoria */}
                <span className="text-[10px] text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
                  {erro.category}
                </span>

                {/* pergunta */}
                <p className="text-sm font-medium text-white mt-2 mb-3">
                  {erro.question}
                </p>

                {/* resposta do usuario (errada) */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-red-400">Sua resposta:</span>
                  <span className="text-xs text-red-300 bg-red-900/30 px-2 py-1 rounded">
                    {erro.userAnswer}
                  </span>
                </div>

                {/* resposta certa */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-green-400">Resposta certa:</span>
                  <span className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded">
                    {erro.correctAnswer}
                  </span>
                </div>

                {/* botao entendi */}
                <button
                  onClick={() => handleEntendi(erro.question)}
                  className="text-xs text-primary hover:underline"
                >
                  ✅ Entendi, remover da lista
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileShell>
  );
};

export default Review;