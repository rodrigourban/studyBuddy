import { useEffect, useState } from "react";
import Question from "../features/Question";
import { QuestionType, shuffleArray } from "../utils/shuffleArray";
import Progress from "../ui/Progress";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000/tests/";
const POST_URL = "http://localhost:3000/scoreList";

function Quiz() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const { quizId } = useParams();
  const navigate = useNavigate();

  async function postScore() {
    const percentScore = ((score * 100) / questions.length).toFixed(2);
    await fetch(POST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: quizId, score: percentScore }),
    });
  }

  function handleNextQuestion() {
    if (currentQuestion + 1 >= questions.length) {
      postScore();
      navigate(`/quiz-results/${quizId}`);
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

  useEffect(function () {
    async function getQuestions() {
      try {
        const response = await fetch(`${API_URL}${quizId}`);
        const data = await response.json();
        if (!data) {
          throw new Error("Failed to fetch questions");
        }
        setQuestions(shuffleArray(data.questions));
        setTitle(data.title);
      } catch (err) {
        console.error("error while fetching", err);
      }
    }
    getQuestions();
  }, []);

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
          numberOfQuestions={questions.length}
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
