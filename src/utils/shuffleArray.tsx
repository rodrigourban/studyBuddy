import { QuestionType } from "../types";

export function shuffleArray(arr: QuestionType[]) {
  return arr.sort(() => Math.random() - 0.5);
}
