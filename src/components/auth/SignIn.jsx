import classes from "./SignIn.module.css";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./../../others/firebase";
import useToken from "./../../hooks/use-token";

let setErrorId;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { addToken } = useToken();

  const handleSetError = (errorMsg) => {
    clearTimeout(setErrorId);
    setError(errorMsg);
    setErrorId = setTimeout(() => {
      setError("");
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value.length < 6) {
      handleSetError("Password must be at least 6 characters!");
      return;
    }
    try {
      setError("");
      setIsLoading(true);
      const { user } = await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      const token = await user.getIdToken();
      addToken(token);

      // alert("Successfully signed in!");
    } catch (error) {
      setIsLoading(false);
      if (error.code === 400 && error.message === "EMAIL_NOT_FOUND") {
        handleSetError("Email is not registered!");
        return;
      }
      handleSetError(error.message.slice(9));
      return;
    }

    setIsLoading(false);
    navigate("/", { replace: true });
  };

  return (
    <form className={classes["form-group"]} onSubmit={handleSubmit}>
      <h3>Login</h3>
      {error && (
        <div className={classes.error}>
          <p>{error}</p>
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" ref={emailRef} required />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" ref={passwordRef} required />
      </div>

      <button disabled={isLoading}>Log In</button>
      <span>
        Need an account? Sign up <Link to="/signup">here</Link>!
        <br />
        <Link to="/">Home</Link>
      </span>
    </form>
  );
};

export default SignIn;
