import QuizList from "../ui/QuizList";

function MainPage() {
  return (
    <div className="relative bg-indigo-100">
      <div className="absolute h-56 w-full bg-gradient-to-r from-indigo-600 to-indigo-500"></div>
      <div className="p-5 relative">
        <h1 className="my-4 pl-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white font-primaryFont">
          👩🏻‍🎓 StudyBuddy
        </h1>
        <h2 className="pt-3 pl-3 text-2xl font-semibold text-white font-primaryFont">
          Select what to practice
        </h2>
        <h3 className="px-3 text-sm text-white font-secondaryFont">
          "Genius is one percent inspiration and ninety-nine percent
          perspiration." - Thomas Edison
        </h3>
        <QuizList />
      </div>
    </div>
  );
}

export default MainPage;
