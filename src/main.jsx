import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/Auth.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const GamesList = lazy(() => import("./pages/GamesList.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

const QuizGame = lazy(() => import("./pages/games/QuizGame.jsx"));
const MemoryGame = lazy(() => import("./pages/games/MemoryGame.jsx"));
const TrueFalseGame = lazy(() => import("./pages/games/TrueFalseGame.jsx"));
const WordGuessGame = lazy(() => import("./pages/games/WordGuessGame.jsx"));
const PuzzleGame = lazy(() => import("./pages/games/PuzzleGame.jsx"));
const BalloonGame = lazy(() => import("./pages/games/BalloonGame.jsx"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl animate-bounce-slow mb-4">🤖</div>
      <p className="text-primary-400 font-heading font-bold text-lg">
        Yükleniyor...
      </p>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oyunlar" element={<GamesList />} />
          <Route path="/hakkinda" element={<About />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit" element={<Register />} />

          <Route path="/oyun/quiz" element={<QuizGame />} />
          <Route path="/oyun/hafiza" element={<MemoryGame />} />
          <Route path="/oyun/dogru-yanlis" element={<TrueFalseGame />} />
          <Route path="/oyun/kelime-tahmin" element={<WordGuessGame />} />
          <Route path="/oyun/puzzle" element={<PuzzleGame />} />
          <Route path="/oyun/balon" element={<BalloonGame />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </AuthProvider>
);
