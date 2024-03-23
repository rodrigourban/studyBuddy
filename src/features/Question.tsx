import AnswerOption from "../ui/AnswerOption";
import correct from "../assets/correctAnswer.mp3";
import wrong from "../assets/wrongAnswer.mp3";
import { useGlobalContext } from "../hooks/useContext";
import { QuestionType, QuizType } from "../types";

function Question({ quiz }: { quiz: QuizType }) {
  const { answer, newAnswer, index } = useGlobalContext();

  const questionObj = quiz.questions.at(index);

  async function handleOnClickAnswer(id: number) {
    newAnswer(id, questionObj as QuestionType);
    if (id === questionObj?.correctOption) {
      correctAnswerAudio.play();
    } else {
      wrongAnswerAudio.play();
    }
  }

  const correctAnswerAudio = new Audio(correct);
  const wrongAnswerAudio = new Audio(wrong);
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
            onSelectAnswer={(id) => handleOnClickAnswer(id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Question;
