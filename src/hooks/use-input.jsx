import { useReducer } from "react";

const inputStateReducer = (prevState, action) => {
  if (action.type === "INPUT_CHANGED") {
    return { value: action.value, isTouched: prevState.isTouched };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: prevState.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return {
    value: "",
    isTouched: false,
  };
};

const useInput = (validateValueFunc) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: "",
    isTouched: false,
  });

  //   const [value, setValue] = useState("");
  //   const [isTouched, setIsTouched] = useState(false);

  //   const valueIsValid = validateValueFunc(value);
  //   const hasError = !valueIsValid && isTouched;

  const valueIsValid = validateValueFunc(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const handleChangedValue = (e) => {
    // setValue(e.target.value);
    dispatch({ type: "INPUT_CHANGED", value: e.target.value });
  };
  const handleBlurInput = () => {
    // setIsTouched(true);
    dispatch({ type: "INPUT_BLUR" });
  };
  const resetFunc = () => {
    // setValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };

  //   return {
  //     value,
  //     isValid: valueIsValid,
  //     hasError,
  //     handleChangedValue,
  //     handleBlurInput,
  //     resetFunc,
  //   };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    handleChangedValue,
    handleBlurInput,
    resetFunc,
  };
};

export default useInput;
