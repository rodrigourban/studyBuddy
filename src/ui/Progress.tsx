function Progress({
  currentQuestion,
  numberOfQuestions,
}: {
  currentQuestion: number;
  numberOfQuestions: number;
}) {
  const completedPercentage = Math.floor(
    currentQuestion / (numberOfQuestions / 100)
  );
  return (
    <>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700">
          Question: {currentQuestion + 1}/{numberOfQuestions}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${completedPercentage}%` }}
        ></div>
      </div>
    </>
  );
}

export default Progress;
