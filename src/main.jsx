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

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WelcomeGif />} />
        <Route path="/home" element={<ScreenTablet />} />
        <Route path="/gizlilik_sozlesmesi" element={<Terms />} />
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
