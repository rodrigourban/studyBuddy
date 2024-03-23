import {
  ActionTypeNewAnswer,
  ActionTypes,
  ActionTypeWithPayload,
  StateProps,
} from "../types";

export function reducer(
  state: StateProps,
  action: ActionTypes | ActionTypeWithPayload | ActionTypeNewAnswer
) {
  switch (action.type) {
    case "quiz/newAnswer":
      return {
        ...state,
        answer: action.payload.answer,
        score:
          action.payload.question?.correctOption === action.payload.answer
            ? state.score + 1
            : state.score,
      };
    case "quiz/nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "quiz/tick":
      return { ...state, secondsElapsed: state.secondsElapsed + 1 };

    case "quiz/finished":
      return { ...state, index: 0, answer: null, score: 0, secondsElapsed: 0 };

    default:
      throw new Error("Invalid action type");
  }
}
