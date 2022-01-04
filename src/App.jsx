import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import AppContent from "./components/AppContent";
import PrivateRoute from "./routes/PrivateRoute";
import ChangePassword from "./components/auth/ChangePassword";
import NotFound from "./components/UI/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<AppContent />}>
        <Route
          path="change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
