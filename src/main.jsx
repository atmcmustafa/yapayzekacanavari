import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
import { AuthProvider } from "./context/Auth.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { QuestionProvider } from "./context/QuestionContext.jsx";
import { BalloonQuestionProvider } from "./context/BallonQuestionContext.jsx";

const WelcomeGif = lazy(() => import("./pages/WelcomeGif.jsx"));
const ScreenTablet = lazy(() => import("./pages/ScreenTablet.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const NewGame = lazy(() => import("./components/NewGame.jsx"));
const GamesList = lazy(() => import("./pages/GamesList.jsx"));
const PuzzleRobot = lazy(() => import("./pages/PuzzleRobot.jsx"));
const BaloonPop = lazy(() => import("./pages/BaloonPop.jsx"));
const PromptTest = lazy(() => import("./pages/PromptTest.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const UserProfile = lazy(() => import("./pages/UserProfile.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QuestionProvider>
      <BalloonQuestionProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </BrowserRouter>
      </BalloonQuestionProvider>
    </QuestionProvider>
  </AuthProvider>
);
