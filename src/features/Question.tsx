import { useState } from "react";
import AnswerOption from "../ui/AnswerOption";
import { QuestionType } from "../utils/shuffleArray";

function Question({
  questionObj,
  onScoreAnswer,
}: {
  questionObj?: QuestionType;
  onNextQuestion: () => void;
  onScoreAnswer: (correct: boolean) => void;
}) {
  const [answer, setAnswer] = useState<number | null>(null);

  function handleOnClickAnswer(id: number) {
    setAnswer(id);
    onScoreAnswer(questionObj?.correctOption === id);
  }

  const hasAnswered = answer !== null;

  return (
    <div className="h-full flex flex-col items-center justify-between p-3 space-y-5">
      <p className="font-semibold text-xl flex-none">{questionObj?.question}</p>
      <ul className="w-full space-y-2 p-4 grow">
        {questionObj?.options.map((item: string, id: number) => (
          <AnswerOption
            value={item}
            key={id}
            id={id}
            correctAnswer={hasAnswered && questionObj?.correctOption === id}
            hasAnswered={hasAnswered}
            onSelectAnswer={handleOnClickAnswer}
          />
        ))}
      </ul>
    </div>
  );
}

export default Question;
