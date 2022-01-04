import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }

  return <Navigate to="/notfound" />;
};

export default PrivateRoute;
