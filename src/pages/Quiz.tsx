import { useState } from "react";
import Question from "../features/Question";
import Progress from "../ui/Progress";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getQuizDetails, postScore } from "../services/apiExam";
import Loader from "../ui/Loading";
import { QuestionType } from "../utils/shuffleArray";

type QuizType = {
  questions: QuestionType[];
  title: string;
};
type Error = {
  message: string;
};
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const { quizId } = useParams();
  const { isLoading, error, data } = useQuery<QuizType, Error>({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuizDetails(Number(quizId)),
  });
  const { mutate: postQuizResult } = useMutation(
    () =>
      postScore({
        score,
        questionsLength: data?.questions.length || 0,
        quizId: Number(quizId),
      }),
    {
      onSuccess: () => navigate(`/quiz-results/${quizId}`),
    }
  );
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader message="Loading quiz..." />;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const { questions, title } = data || {};

  function handleNextQuestion() {
    if (questions && currentQuestion + 1 >= questions.length) {
      postQuizResult();
    }
    setCurrentQuestion((previousValue) => previousValue + 1);
    setHasAnswered(false);
  }

  function handleScoreAnswer(correct: boolean) {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setHasAnswered(true);
  }

  return (
    <div className="h-svh flex flex-col bg-indigo-50">
      <div className="flex items-center flex-none p-5">
        <Link to="/" className="flex-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Link>
        <h1 className="grow text-center font-primaryFont font-semibold text-2xl">
          {title}
        </h1>
        <button className="flex-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
      </div>
      <div className="p-5 flex-none">
        <Progress
          currentQuestion={currentQuestion}
          numberOfQuestions={questions?.length || 0}
        />
      </div>
      <div className="p-3 grow">
        <Question
          questionObj={questions?.at(currentQuestion)}
          key={`question-${currentQuestion}`}
          onNextQuestion={handleNextQuestion}
          onScoreAnswer={handleScoreAnswer}
        />
      </div>
      <div className="p-5 flex-none">
        <span className="rounded-full border-slate-900 border-2 text-xl p-2">
          50:00
        </span>
      </div>
      <div className="">
        {hasAnswered && (
          <button
            className="block rounded-full text-xl border-slate-600 border-2 p-3 hover:bg-slate-300 text-slate-900 w-full mb-1 disabled:pointer-events-none"
            onClick={handleNextQuestion}
          >
            NEXT
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
