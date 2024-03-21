import ExamList from "../ui/ExamList";

function MainPage() {
  return (
    <div className="relative bg-indigo-100 h-svh">
      <div className="absolute h-36 w-full bg-gradient-to-r from-indigo-600 to-indigo-500"></div>
      <div className="p-5 relative">
        <h1 className="pt-3 pl-3 text-2xl font-semibold text-white font-primaryFont">
          Select what to practice
        </h1>
        <h3 className="px-3 text-sm text-white font-secondaryFont">
          "Genius is one percent inspiration and ninety-nine percent
          perspiration." - Thomas Edison
        </h3>
        <ExamList />
      </div>
    </div>
  );
}

export default MainPage;
