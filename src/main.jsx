import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Terms from "./pages/Terms.jsx";
import ScreenTablet from "./pages/ScreenTablet.jsx";
import WelcomeGif from "./pages/WelcomeGif.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NewGame from "./components/NewGame.jsx";
import GamesList from "./pages/GamesList.jsx";
import PuzzleRobot from "./pages/PuzzleRobot.jsx";
import BaloonPop from "./pages/BaloonPop.jsx";
import PromptTest from "./pages/PromptTest.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WelcomeGif />} />
        <Route path="/home" element={<ScreenTablet />} />
        <Route path="/gizlilik_sozlesmesi" element={<Terms />} />
        <Route path="/newGame" element={<NewGame />} />
        <Route path="/gameList" element={<GamesList />} />
        <Route path="/robot-puzzle" element={<PuzzleRobot />} />
        <Route path="/baloon-pop" element={<BaloonPop />} />
        <Route path="/prompt-test" element={<PromptTest />} />
        <Route path="*" element={<ErrorPage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
