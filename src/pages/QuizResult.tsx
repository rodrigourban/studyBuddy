import { Link, useParams } from "react-router-dom";
import educationImage from "../../public/undraw_education.svg";
import { useQuery } from "react-query";
import { getScore } from "../services/apiExam";
import Loading from "../ui/Loading";

type Score = {
  score: number;
};

type Error = {
  message: string;
};

function QuizResult() {
  const { quizId } = useParams();
  const { data, isLoading, error } = useQuery<Score, Error>({
    queryFn: () => getScore(Number(quizId)),
  });

  if (isLoading) {
    return <Loading message="Loading results..." />;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const { score } = data || {};

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
          You scored {score ? score : "0"}%
        </h1>
        <p className="font-secondaryFont text-xl mt-2">
          {score && score <= 50 && "You need to study more, keep it going! 📝"}
          {score &&
            score > 50 &&
            score < 90 &&
            "Good job, keep practising for better results! 😊"}
          {score &&
            score >= 90 &&
            "Excellent! You have great knolewdge about this topic! 🎉"}
        </p>
      </div>
      <div className="p-3">
        <Link
          to="/"
          className="block h-12 pt-2 text-center font-primaryFont bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 text-xl hover:cursor-pointer"
        >
          Finish
        </Link>
      </div>
    </div>
  );
}

export default QuizResult;
