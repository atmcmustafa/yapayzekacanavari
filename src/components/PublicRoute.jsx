import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/" /> : children;
};

export default PublicRoute;
