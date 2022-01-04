import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className={classes.notfound}>
        <span className={classes.text}>404 | Not Found</span>
        <span className={classes.back} onClick={handleBack}>
          Back
        </span>
      </div>
    </>
  );
};

export default NotFound;
