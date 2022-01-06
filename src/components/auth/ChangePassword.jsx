import classes from "./ChangePassword.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./../../others/firebase";
import Modal from "../UI/Modal";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleCancel = (bool) => () => {
    navigate("/");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Password doesn't match!");
      return;
    }

    try {
      await auth.currentUser.updatePassword(passwordRef.current.value);
      alert("Successfully changed password!");
      handleCancel()();
    } catch (error) {
      if (error.code === 400 && error.message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN") {
        setError("Can't change password: Re-login to change password");
      }
      setError("Can't change password: error.message");
    }
  };

  return (
    <Modal onClose={handleCancel}>
      <div className={classes.container}>
        <h2 className={classes.title}>Change password</h2>
        <form className={classes["form-group"]} onSubmit={handleSubmit}>
          <div className={classes["control-group"]}>
            <label htmlFor="newPassword">New password</label>
            <input type="password" id="newPassword" ref={passwordRef} required />
          </div>
          <div className={classes["control-group"]}>
            <label htmlFor="confirmNewPassword">Confirm password</label>
            <input type="password" id="confirmNewPassword" ref={confirmPasswordRef} required />
          </div>

          {error && <p className={classes.error}>{error}</p>}

          <div className={classes.actions}>
            <button type="button" onClick={handleCancel()}>
              Cancel
            </button>
            <button>Change</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePassword;
