export type ActionTypes = {
  type: "quiz/nextQuestion" | "quiz/tick" | "quiz/finished";
};

export type ActionTypeWithPayload = {
  type: "quiz/startQuiz" | "quiz/newAnswer";
  payload: Record<string, any>;
};

export type ActionTypeNewAnswer = {
  type: "quiz/newAnswer";
  payload: {
    answer: number;
    question: QuestionType;
  };
};

export type QuizType = {
  questions: QuestionType[];
  title: string;
  lastScore?: number;
  lastTimer?: string;
  id: number;
};

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type StateProps = {
  index: number;
  answer: number | null;
  score: number;
  secondsElapsed: number;
  finishQuiz: () => void;
  timerTick: () => void;
  newAnswer: (id: number, question: QuestionType) => void;
  nextQuestion: () => void;
  updateScore: (quizId: number, questionsLength: number) => void;
};

export type AnswerOptionType = {
  value: string;
  id: number;
  correctAnswer: boolean;
  hasAnswered: boolean;
  onSelectAnswer: (id: number) => void;
};
