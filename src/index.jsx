import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import ReactDOM from "react-dom";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import PrivateRoute from "./routes/PrivateRoute";
import ChangePassword from "./components/auth/ChangePassword";
import NotFound from "./components/UI/NotFound";
import App from "./App";

const AppContent = () => {
  useEffect(() => {
    document.title = "FastFoodz";
  }, []);
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<App />}>
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
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
