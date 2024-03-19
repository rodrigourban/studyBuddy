export type AnswerOptionType = {
  value: string;
  id: number;
  correctAnswer: boolean;
  hasAnswered: boolean;
  onSelectAnswer: (id: number) => void;
};
