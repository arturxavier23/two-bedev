import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import { phasesData } from "@/data/questions";
import { modulesData } from "@/data/modules";
import { Button } from "@/components/ui/button";
import { addXP, completePhase, addToHistory, addWrongAnswer } from "@/lib/progress";

// tela do quiz - mostra as perguntas da fase selecionada
// calcula o xp ganho no final
const Lesson = () => {
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();

  // acha o modulo pelo slug e filtra as fases dele
  const modulo = modulesData.find((m) => m.slug === moduleId);
  const fasesDoModulo = phasesData.filter((p) => p.moduleId === modulo?.id);
  const fase = fasesDoModulo[Number(lessonId) - 1];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpGanho, setXpGanho] = useState(0);

  // se a fase nao existe na url mostra erro e botao de voltar
  if (!fase) {
    return (
      <MobileShell>
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-5">
          <p className="text-white text-xl font-bold mb-4">Fase não encontrada</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-800 text-white px-6 py-3 rounded-lg"
          >
            Voltar
          </button>
        </div>
      </MobileShell>
    );
  }

  const question = fase.questions[currentIndex];
  const totalQuestions = fase.questions.length;

  // funcao que roda quando clica numa opcao espera 800ms e vai pra proxima ou mostra o resultado 
  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);

  if (index === question.correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      // salva a pergunta errada pra revisao
      const mod = modulesData.find((m) => m.id === fase?.moduleId);
      addWrongAnswer({
        phaseId: fase?.phaseId || 0,
        question: question.question,
        userAnswer: question.options[index],
        correctAnswer: question.options[question.correctAnswer],
        category: mod?.title || "",
      });
    }

    // delay pra dar tempo de ver se acertou ou errou
    setTimeout(() => {
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        // calcula quantas vezes acertou e quanto de xp ganhou
        // 50 xp por acerto
        const acertou = index === question.correctAnswer;
        const finalScore = acertou ? score + 1 : score;
        const xp = finalScore * 50;
        addXP(xp);
        completePhase(fase.phaseId);
        // salva no historico
        const mod = modulesData.find((m) => m.id === fase?.moduleId);
        addToHistory({
          phaseId: fase?.phaseId || 0,
          phaseTitle: fase?.title || "",
          moduleName: mod?.title || "",
          score: finalScore,
          total: totalQuestions,
          xpGanho: xp,
          data: new Date().toLocaleDateString("pt-BR"),
        });
        setXpGanho(xp);
        setFinished(true);
      }
    }, 800);
  };
  // quando termina todas as perguntas mostra o resultado
  if (finished) {
    const porcentagem = Math.floor((score / totalQuestions) * 100);
    return (
      <MobileShell>
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-5">
          <p className="text-4xl mb-4">🎉</p>
          <h1 className="text-white text-2xl font-bold">Parabéns!</h1>
          <p className="text-white text-lg mt-5">{score} / {totalQuestions} corretas</p>
          <p className="text-purple-400 mt-2">{porcentagem}% de acerto</p>
          <p className="text-green-400 text-xl font-bold mt-5">+{xpGanho} XP</p>
          <Button
            onClick={() => navigate(`/module/${moduleId}`)}
            className="mt-10 bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-full"
          >
            Continuar
          </Button>
        </div>
      </MobileShell>
    );
  }
  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col bg-slate-950 p-5 justify-center">

       {/* barra de progresso */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>{fase.title}</span>
            <span>{currentIndex + 1}/{totalQuestions}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* pergunta */}
        <h2 className="text-white text-xl font-bold mb-6">
          {question.question}
        </h2>

        {/* opcoes */}
        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
              className={`${
                selected !== null
                  ? index === question.correctAnswer
                    ? "bg-green-600"
                    : index === selected
                    ? "bg-red-600"
                    : "bg-slate-800"
                  : "bg-slate-800"
              } text-white p-4 rounded-xl text-left transition-colors disabled:cursor-default`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </MobileShell>
  );
};

export default Lesson;