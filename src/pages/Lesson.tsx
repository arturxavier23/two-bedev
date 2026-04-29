import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import { phasesData } from "@/data/questions";
import { modulesData } from "@/data/modules";

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

  // se nao achou a fase
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

  // quando clica numa opcao vai pra proxima pergunta
  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);

    if (index === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      }
    }, 800);
  };

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