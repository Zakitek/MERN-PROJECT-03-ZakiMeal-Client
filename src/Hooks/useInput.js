import { useState, useEffect } from "react";

export const useInput = (cb) => {
    const [enteredValue, setEntereValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueChangeHandler = (e) => {
        setEntereValue(e.target.value);
    };
    const isValid = cb(enteredValue)
    const hasError = !isValid && isTouched

    const valueBlurHandler = () => {
        setIsTouched(true);
    };
    return {
        enteredValue,
        hasError,
        isValid,
        valueChangeHandler,
        valueBlurHandler,
        setEntereValue,
        setIsTouched,
    };
};
