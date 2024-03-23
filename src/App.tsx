import Quiz from "./pages/Quiz";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import QuizResult from "./pages/QuizResult";
import { GlobalProvider } from "./hooks/useContext";
import EditQuiz from "./pages/EditQuiz";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/take/:quizId" element={<Quiz />} />
          <Route path="/quiz-results/:quizId" element={<QuizResult />} />
          <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
