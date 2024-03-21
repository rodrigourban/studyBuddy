import { useQuery } from "react-query";
import { getExamList } from "../services/apiExam";
import Loader from "../ui/Loading";
import ExamCard from "../ui/ExamCard";

type Exam = {
  questions: string[];
  id: number;
  points?: number;
  name: string;
};

type Error = {
  message: string;
};

function ExamList() {
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
    <ul className="space-y-2 mt-2 p-5 ">
      {data?.map((exam, index) => (
        <ExamCard key={`exam-${exam.id}`} exam={exam} index={index} />
      ))}
    </ul>
  );
}

export default ExamList;
