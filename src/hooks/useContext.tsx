import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { reducer } from "./reducer";
import { QuestionType, StateProps } from "../types";
import { postScore } from "../services/apiQuiz";

const initialState: StateProps = {
  index: 0,
  answer: null,
  score: 0,
  secondsElapsed: 0,
  finishQuiz: () => {},
  timerTick: () => {},
  newAnswer: () => {},
  nextQuestion: () => {},
  updateScore: () => {},
};

const GlobalContext = createContext<StateProps>(initialState);

function GlobalProvider({ children }: PropsWithChildren) {
  const [context, dispatch] = useReducer(reducer, initialState);

  const { index, answer, score, secondsElapsed } = context;

  function finishQuiz() {
    dispatch({ type: "quiz/finished" });
  }

  function nextQuestion() {
    dispatch({ type: "quiz/nextQuestion" });
  }

  function timerTick() {
    dispatch({ type: "quiz/tick" });
  }

  function newAnswer(id: number, question: QuestionType) {
    dispatch({
      type: "quiz/newAnswer",
      payload: {
        question,
        answer: id,
      },
    });
  }

  async function updateScore(quizId: number, questionsLength: number) {
    const response = postScore({
      score,
      questionsLength,
      secondsElapsed,
      quizId,
    });
    console.log("Update score response: ", response);
  }

  return (
    <GlobalContext.Provider
      value={{
        index,
        answer,
        score,
        secondsElapsed,
        timerTick,
        newAnswer,
        nextQuestion,
        finishQuiz,
        updateScore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalContext(): StateProps {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("Using context outside of provider");
  }
  return context;
}

export { GlobalProvider, useGlobalContext };
