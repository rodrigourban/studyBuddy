import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { QuizType } from "../types";

const QuizCardVariants = {
  initial: { opacity: 0, translateX: -50 },
  animate: (index: number) => ({
    opacity: 1,
    translateX: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

function QuizCard({
  quiz,
  index,
  onDeleteQuiz,
}: {
  quiz: QuizType;
  index: number;
  onDeleteQuiz: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <motion.li
      className="rounded-lg flex items-center justify-between p-5 bg-indigo-50 shadow-md"
      whileHover={{ scale: 1.02 }}
      variants={QuizCardVariants}
      initial="initial"
      animate="animate"
      custom={index}
    >
      <div>
        <p className="font-primaryFont text-lg md:text-xl font-bold">
          {quiz.title}
        </p>
        <div className="flex">
          <p className="text-sm font-secondaryFont">
            Last score: {quiz.lastScore || 0}%
          </p>
          <p className="text-sm font-secondaryFont ml-2">
            Questions: {quiz.questions.length || 0}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-3">
        <button
          onClick={onDeleteQuiz}
          className="block w-20 h-9 text-center bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 pt-1 hover:cursor-pointer"
        >
          🗑 Delete
        </button>

        <Link
          to={`/edit-quiz/${quiz.id}`}
          className="block w-20 h-9 text-center bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 pt-1 hover:cursor-pointer"
        >
          ✏ Edit
        </Link>

        <Link
          to={`/take/${quiz.id}`}
          className="block w-20 h-9 text-center bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 pt-1 hover:cursor-pointer"
        >
          ✍🏻 Take
        </Link>
      </div>
    </motion.li>
  );
}

export default QuizCard;
