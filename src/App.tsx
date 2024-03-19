import Quiz from "./pages/Quiz";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizResult from "./pages/QuizResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MainPage />} />
        <Route path="/take/:quizId" element={<Quiz />} />
        <Route path="/quiz-results/:quizId" element={<QuizResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
