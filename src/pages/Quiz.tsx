import { useEffect, useState } from "react";
import Question from "../features/Question";
import Progress from "../ui/Progress";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/Loading";
import Timer from "../ui/Timer";
import { useGlobalContext } from "../hooks/useContext";
import { getQuizDetails } from "../services/apiQuiz";
import { QuizType } from "../types";

function Quiz() {
  const { answer, index, nextQuestion, finishQuiz, updateScore } =
    useGlobalContext();
  const [quiz, setQuiz] = useState<QuizType>();
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(function () {
    async function startQuiz() {
      const quiz = await getQuizDetails(Number(quizId));
      setQuiz(quiz);
    }
    startQuiz();
  }, []);

  if (!quiz) {
    return <Loader message="Loading quiz..." />;
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
            onClick={() => finishQuiz()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Link>
        <h1 className="grow text-center font-primaryFont font-semibold text-2xl">
          {quiz.title}
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
        <Progress quiz={quiz} />
      </div>
      <div className="p-3 grow">
        <Question quiz={quiz} />
      </div>
      <footer>
        <div className="p-5 flex-none ml-5">
          <Timer />
        </div>
        <div className="">
          {answer !== null && (
            <button
              className="block rounded-full text-xl border-slate-600 border-2 p-3 hover:bg-slate-300 text-slate-900 w-full mb-1 disabled:pointer-events-none"
              onClick={() => {
                if (index + 1 < quiz.questions.length) {
                  nextQuestion();
                } else {
                  updateScore(Number(quizId), quiz.questions.length);
                  navigate(`/quiz-results/${quizId}`);
                }
              }}
            >
              NEXT
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Quiz;
