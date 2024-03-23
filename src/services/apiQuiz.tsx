import { QuestionType, QuizType } from "../types";

const QUIZ_URL = "http://localhost:3000/tests";

export async function getQuizList() {
  const response = await fetch(QUIZ_URL);
  const data = await response.json();
  if (!data) throw new Error("Network error, please try again.");
  return data;
}

export async function createQuiz(currentQuizsLength: number) {
  const response = await fetch(`${QUIZ_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "New Quiz",
      id: currentQuizsLength + 1,
      questions: [],
    }),
  });
  return response;
}

export async function deleteQuiz(quizId: number) {
  const response = await fetch(`${QUIZ_URL}/${quizId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function updateQuiz(questions: QuestionType[], quizId: string) {
  const response = await fetch(`${QUIZ_URL}/${quizId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questions }),
  });
  return response;
}

export async function postScore({
  score,
  questionsLength,
  secondsElapsed,
  quizId,
}: {
  score: number;
  questionsLength: number;
  secondsElapsed: number;
  quizId: number;
}) {
  // current score calculation is whacky since it uses fixed 10 points per question
  const percentScore = ((score * 100) / questionsLength).toFixed(2);
  const response = await fetch(`${QUIZ_URL}/${quizId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lastScore: percentScore,
      lastTimer: secondsElapsed,
    }),
  });
  return response;
}

export async function getQuizDetails(quizId: number) {
  const response = await fetch(`${QUIZ_URL}/${quizId}`);
  const data = (await response.json()) as QuizType;
  if (!data) throw new Error("Network error, please try again.");
  return data;
}

export async function getScore(quizId: number) {
  const response = await fetch(`${QUIZ_URL}/${quizId}`);
  const data = (await response.json()) as {
    lastScore: number;
    lastTimer: number;
  };
  if (!data) throw new Error("Network error, please try again.");
  return { score: data?.lastScore, secondsElapsed: data?.lastTimer };
}
