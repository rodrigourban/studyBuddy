import { useEffect, useState } from "react";

import { createQuiz, deleteQuiz, getQuizList } from "../services/apiQuiz";
import { QuizType } from "../types";
import Loader from "./Loading";
import QuizCard from "./QuizCard";

function QuizList() {
  const [data, setData] = useState<QuizType[]>([]);

  useEffect(function () {
    fetchData();
  }, []);

  async function fetchData() {
    const quizs = await getQuizList();
    setData(quizs);
  }

  async function handleCreateQuiz() {
    try {
      const result = await createQuiz(data.length);
      console.log("Creating new quiz response: ", result);
    } catch (err) {
      console.log("Error while creating a new quiz: ", err);
    } finally {
      fetchData(); // refresh list
    }
  }

  async function handleDeleteQuiz(quizId: number) {
    const response = deleteQuiz(quizId);
    console.log("Delete quiz response: ", response);
    fetchData(); // refresh list
  }

  if (!data) {
    return <Loader message="Loading quiz list..." />;
  }

  return (
    <ul className="space-y-2 mt-2 p-5">
      {data?.map((quiz, index) => (
        <QuizCard
          key={`quiz-${quiz.id}`}
          quiz={quiz}
          index={index}
          onDeleteQuiz={() => handleDeleteQuiz(quiz.id)}
        />
      ))}
      <button className="primaryButton" onClick={handleCreateQuiz}>
        Create new
      </button>
    </ul>
  );
}

export default QuizList;
