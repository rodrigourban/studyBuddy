export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export function shuffleArray(arr: QuestionType[]) {
  return arr.sort(() => Math.random() - 0.5);
}
