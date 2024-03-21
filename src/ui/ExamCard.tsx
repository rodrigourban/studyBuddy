import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Exam = {
  questions: string[];
  id: number;
  points?: number;
  name: string;
};

const examCardVariants = {
  initial: { opacity: 0, translateX: -50 },
  animate: (index: number) => ({
    opacity: 1,
    translateX: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

function ExamCard({ exam, index }: { exam: Exam; index: number }) {
  return (
    <motion.li
      className="rounded-lg flex items-center justify-between p-5 bg-indigo-50 shadow-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={examCardVariants}
      initial="initial"
      animate="animate"
      custom={index}
    >
      <div>
        <p className="font-primaryFont text-lg md:text-xl font-bold">
          {exam.name}
        </p>
        <p className="text-sm font-secondaryFont">Last score: 100%</p>
      </div>

      <Link
        to={`/take/${exam.id}`}
        className="w-20 h-9 text-center bg-indigo-600 text-white rounded-sm hover:text-indigo-600 hover:bg-white border-indigo-600 border-2 pt-1 hover:cursor-pointer"
      >
        Take
      </Link>
    </motion.li>
  );
}

export default ExamCard;
