import { useState, useRef } from "react";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router";
import { auth, createUserDocument } from "./../../others/firebase";
import { Link } from "react-router-dom";

let setErrorId;

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  // const user = useSelector((state) => state.auth.currentUser);

  const handleSetError = (errorMsg) => {
    clearTimeout(setErrorId);
    setError(errorMsg);
    setErrorId = setTimeout(() => {
      setError("");
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (emailRef.current.value.length < 10) {
      handleSetError("Please enter a valid email!");
      return;
    }
    if (usernameRef.current.value.length < 3) {
      handleSetError("Username must be at least 3 characters!");
      return;
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      handleSetError("Password doesn't match!");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const { user } = await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      auth.signOut();

      await createUserDocument(user, {
        displayName: usernameRef.current.value,
        role: ["user"],
      });

      alert("Successfully signed up!");
    } catch (error) {
      setIsLoading(false);
      handleSetError(error.message.slice(9));
      return;
    }
    setIsLoading(false);
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <form className={classes["form-group"]} onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        {/* {user?.email} */}
        {error && (
          <div className={classes.error}>
            <p>{error}</p>
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            ref={emailRef}
            required
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            ref={usernameRef}
            required
          />
        </div>

        <div className={classes.password}>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              ref={passwordRef}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm"
              id="passwordConfirm"
              ref={passwordConfirmRef}
              required
            />
          </div>
        </div>

        <button disabled={isLoading}>Sign Up</button>
        <span>
          <Link to="/">Home</Link>
        </span>
      </form>
    </>
  );
};

export default SignUp;
