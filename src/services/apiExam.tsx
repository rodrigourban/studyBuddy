import { QuestionType, shuffleArray } from "../utils/shuffleArray";

const QUIZLIST_URL = "http://localhost:3000/testList";
const QUIZ_URL = "http://localhost:3000/tests";
const POST_URL = "http://localhost:3000/scoreList";
const SCORE_URL = "http://localhost:3000/scoreList";

type QuizType = {
  questions: QuestionType[];
  title: string;
};

export async function getExamList() {
  const response = await fetch(QUIZLIST_URL);
  const data = await response.json();
  if (!data) throw new Error("Network error, please try again.");
  return data;
}

export async function postScore({
  score,
  questionsLength,
  quizId,
}: {
  score: number;
  questionsLength: number;
  quizId: number;
}) {
  const percentScore = ((score * 100) / questionsLength).toFixed(2);
  await fetch(`${POST_URL}/${quizId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score: percentScore }),
  });
}

export async function getQuizDetails(quizId: number) {
  const response = await fetch(`${QUIZ_URL}/${quizId}`);
  const data = (await response.json()) as QuizType;
  if (!data) throw new Error("Network error, please try again.");
  return { ...data, questions: shuffleArray(data?.questions) };

  return data;
}

export async function getScore(quizId: number) {
  const response = await fetch(`${SCORE_URL}/${quizId}`);
  const data = (await response.json()) as { score: number };
  if (!data) throw new Error("Network error, please try again.");
  return data;
}
