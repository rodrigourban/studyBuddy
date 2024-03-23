import { Link, useParams } from "react-router-dom";
import educationImage from "../assets/undraw_education.svg";
import { useEffect, useState } from "react";
import { getScore } from "../services/apiQuiz";
import { formatTime } from "../utils/formatTime";
import { useGlobalContext } from "../hooks/useContext";

function QuizResult() {
  const [results, setResults] = useState({ score: 0, secondsElapsed: 0 });
  const { finishQuiz } = useGlobalContext();
  const { quizId } = useParams();

  useEffect(() => {
    async function getQuizResults() {
      const data = await getScore(Number(quizId));
      setResults({
        score: data.score,
        secondsElapsed: data.secondsElapsed,
      });
    }
    getQuizResults();
  }, []);

  const { score, secondsElapsed } = results;

  return (
    <div className="h-svh flex flex-col bg-indigo-50">
      <div className="flex items-center flex-none">
        <h1 className="grow text-center font-primaryFont font-semibold text-4xl py-5">
          📝Results
        </h1>
      </div>
      <div className="p-3 grow flex flex-col items-center justify-center">
        <img
          src={educationImage}
          alt="quiz exam illustration"
          className="h-96 w-96"
        />
        <h1 className="font-primaryFont text-3xl font-bold">
          You finished the score in {formatTime(secondsElapsed)} minutes, and
          scored {score}%
        </h1>
        <p className="font-secondaryFont text-xl mt-2">
          {score <= 50 && "You need to study more, keep it going! 📝"}
          {score > 50 &&
            score < 90 &&
            "Good job, keep practising for better results! 😊"}
          {score >= 90 &&
            "Excellent! You have great knolewdge about this topic! 🎉"}
        </p>
      </div>
      <div className="p-3">
        <Link
          to="/"
          className="block h-12 pt-2 text-center font-primaryFont bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 text-xl hover:cursor-pointer"
          onClick={() => finishQuiz()}
        >
          Finish
        </Link>
      </div>
    </div>
  );
}

export default QuizResult;
