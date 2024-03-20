import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getExamList } from "../services/apiExam";
import Loader from "../ui/Loading";

type Exam = {
  questions: string[];
  id: number;
  points?: number;
  name: string;
};

type Error = {
  message: string;
};

function MainPage() {
  const { isLoading, data, error } = useQuery<Exam[], Error>(
    "examList",
    getExamList
  );

  if (isLoading) {
    return <Loader message="Loading exam list..." />;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="relative bg-indigo-100 h-svh">
      <div className="absolute h-36 w-full bg-gradient-to-r from-indigo-600 to-indigo-500"></div>
      <div className="p-5 relative">
        <h1 className="pt-3 pl-3 text-2xl font-semibold text-white font-primaryFont">
          Select what to practice
        </h1>
        <h3 className="px-3 text-sm text-white font-secondaryFont">
          "Genius is one percent inspiration and ninety-nine percent
          perspiration." - Thomas Edison
        </h3>
        <ul className="space-y-2 mt-2 p-5 ">
          {data?.map((test) => (
            <li
              className="rounded-lg flex items-center justify-between p-5 bg-indigo-50 shadow-md"
              key={`exam-${test.id}`}
            >
              <div>
                <p className="font-primaryFont text-lg md:text-xl font-bold">
                  {test.name}
                </p>
                <p className="text-sm font-secondaryFont">Last score: 100%</p>
              </div>

              <Link
                to={`/take/${test.id}`}
                className="w-20 h-9 text-center bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 pt-1 hover:cursor-pointer"
              >
                Take
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
