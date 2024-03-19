import { useState } from "react";
import { AnswerOptionType } from "./types";

function AnswerOption({
  value,
  id,
  correctAnswer,
  hasAnswered,
  onSelectAnswer,
}: AnswerOptionType) {
  const [selected, setSelected] = useState(false);
  return (
    <li>
      <button
        className={`block rounded-full text-xl border-slate-600 border-2 p-3 hover:bg-slate-300 text-slate-900 w-full transition-all duration-500 ${
          selected ? "selected" : ""
        } ${
          hasAnswered && (correctAnswer ? "correct" : "incorrect")
        } disabled:pointer-events-none`}
        onClick={() => {
          onSelectAnswer(id);
          setSelected(true);
        }}
        disabled={hasAnswered}
      >
        {value}
      </button>
    </li>
  );
}

export default AnswerOption;
