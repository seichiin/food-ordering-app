import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  if (token) {
    return children;
  }

  return <Navigate to="/notfound" />;
};

export default PrivateRoute;
