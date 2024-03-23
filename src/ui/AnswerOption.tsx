import { AnswerOptionType } from "../types";
import { motion } from "framer-motion";

function AnswerOption({
  value,
  id,
  correctAnswer,
  hasAnswered,
  onSelectAnswer,
}: AnswerOptionType) {
  return (
    <motion.li whileTap={{ scale: 0.95 }}>
      <button
        className={`block rounded-full text-xl border-slate-600 border-2 p-3 hover:bg-slate-300 text-slate-900 w-full transition-all duration-500 $ ${
          hasAnswered && (correctAnswer ? "correct" : "incorrect")
        } disabled:pointer-events-none`}
        onClick={() => {
          onSelectAnswer(id);
        }}
        disabled={hasAnswered}
      >
        {value}
      </button>
    </motion.li>
  );
}

export default AnswerOption;
