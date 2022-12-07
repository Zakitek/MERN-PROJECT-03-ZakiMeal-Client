import React, { useContext, useEffect, useRef, useState } from "react";
import { useInput } from "../../Hooks/useInput";
import classes from "./SignUpForm.module.css";
import { useNavigate } from "react-router-dom";
import authContext from "../../store/authContext";

function SignUpForm({ setFormHeight = () => {} }) {
    const { login } = useContext(authContext);
    const [isLoading, setIsLoaidng] = useState(false);
    const navigate = useNavigate();
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const passwordPattern = /./;
    /*  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/ */ // Form Validation
    const {
        enteredValue: enteredName,
        setEntereValue: setEnteredName,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameBlurHandler,
        setIsTouched: setNameIsTouched,
    } = useInput((value) => value !== "");

    const {
        enteredValue: enteredEmail,
        setEntereValue: setEnteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler,
        setIsTouched: setEmailIsTouched,
    } = useInput((value) => emailPattern.test(value));

    const {
        enteredValue: enteredPassword,
        setEntereValue: setEnteredPassword,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        valueBlurHandler: passwordBlurHandler,
        setIsTouched: setPasswordIsTouched,
    } = useInput((value) => passwordPattern.test(value));

    const {
        enteredValue: enteredConfirmPassword,
        setEntereValue: setEnteredConfirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        valueBlurHandler: confirmPasswordBlurHandler,
        setIsTouched: setConfirmPasswordIsTouched,
    } = useInput((value) => value === enteredPassword);

    const {
        enteredValue: enteredPhone,
        setEntereValue: setEnteredPhone,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        valueBlurHandler: phoneBlurHandler,
        setIsTouched: setPhoneIsTouched,
    } = useInput((value) => phonePattern.test(value));

    const {
        enteredValue: enteredAddress,
        setEntereValue: setEnteredAddress,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        valueBlurHandler: addressBlurHandler,
        setIsTouched: setAddressIsTouched,
    } = useInput((value) => value !== "");

    let formIsValid = false;
    if (
        nameIsValid &&
        emailIsValid &&
        phoneIsValid &&
        enteredAddress &&
        passwordIsValid &&
        confirmPasswordIsValid
    ) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setEnteredName("");
        setEnteredPhone("");
        setEnteredAddress("");
        setEnteredEmail("");
        setEnteredPassword("");
        setEnteredConfirmPassword("");
        setNameIsTouched(false);
        setAddressIsTouched(false);
        setEmailIsTouched(false);
        setPhoneIsTouched(false);
        setPasswordIsTouched(false);
        setConfirmPasswordIsTouched(false);

        const user = {
            fullname: enteredName,
            email: enteredEmail,
            address: enteredAddress,
            password: enteredPassword,
            phone: enteredPhone,
        };

        let url = "http://localhost:5000/users/signup";

        const sendData = async () => {
            try {
                setIsLoaidng(true);
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                }
                const data = await response.json();
                if (data) {
                    setIsLoaidng(false);
                    login(data.token, data.expiresIn,data.user);
                    navigate("/profile");
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error);
            }
        };

        sendData();

        // user validation
    };
    const formRef = useRef(null);
    useEffect(() => {
        const formHeight = formRef.current.getBoundingClientRect().height;
        setFormHeight(formHeight);
    });

    if (isLoading) {
        return (
            <div ref={formRef}>
                <div className={classes.signup__section}>
                    <div>Is loading ...</div>
                </div>
                <div className={classes.buttonsSection}>
                    <button type="submit" disabled={!formIsValid} form="myform" className={classes.signUpBtn}>
                        Register
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={formRef}>
            <div className={classes.signup__section}>
                <form
                    className={classes.form__signup}
                    onSubmit={formSubmitHandler}
                    id="myform"
                >
                    <div className={classes["form-group"]}>
                        <label htmlFor="name">full name: </label>
                        <input
                            type="text"
                            onChange={nameChangeHandler}
                            onBlur={nameBlurHandler}
                            value={enteredName}
                            className={nameHasError ? classes.errorInput : ""}
                        />
                        {nameHasError && (
                            <h4 className={classes.errorMsg}>
                                Name can't be empty
                            </h4>
                        )}
                    </div>
                    <div className={classes["form-group"]}>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            value={enteredEmail}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            className={emailHasError ? classes.errorInput : ""}
                        />
                        {emailHasError && (
                            <h4 className={classes.errorMsg}>
                                Email is not valid
                            </h4>
                        )}
                    </div>
                    <div className={classes["form-group"]}>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            autoComplete="on"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            className={
                                passwordHasError ? classes.errorInput : ""
                            }
                        />
                        {passwordHasError && (
                            <h4 className={classes.errorMsg}>
                                Password is not valid
                            </h4>
                        )}
                    </div>
                    <div className={classes["form-group"]}>
                        <label htmlFor="password">Confirm Password: </label>
                        <input
                            type="password"
                            autoComplete="on"
                            value={enteredConfirmPassword}
                            onChange={confirmPasswordChangeHandler}
                            onBlur={confirmPasswordBlurHandler}
                            className={
                                confirmPasswordHasError
                                    ? classes.errorInput
                                    : ""
                            }
                        />
                        {confirmPasswordHasError && (
                            <h4 className={classes.errorMsg}>
                                This password isn't similar to the one entered
                                above.
                            </h4>
                        )}
                    </div>

                    <div className={classes["form-group"]}>
                        <label htmlFor="phone">Phone: </label>
                        <input
                            type="text"
                            value={enteredPhone}
                            onChange={phoneChangeHandler}
                            onBlur={phoneBlurHandler}
                            className={phoneHasError ? classes.errorInput : ""}
                        />
                        {phoneHasError && (
                            <h4 className={classes.errorMsg}>
                                Phone is not valid
                            </h4>
                        )}
                    </div>
                    <div className={classes["form-group"]}>
                        <label htmlFor="address">Address: </label>
                        <input
                            type="text"
                            value={enteredAddress}
                            onChange={addressChangeHandler}
                            onBlur={addressBlurHandler}
                            className={
                                addressHasError ? classes.errorInput : ""
                            }
                        />
                        {addressHasError && (
                            <h4 className={classes.errorMsg}>
                                Address can't be empty
                            </h4>
                        )}
                    </div>
                </form>
            </div>
            <div className={classes.buttonsSection}>
                <button type="submit" disabled={!formIsValid} form="myform">
                    Register
                </button>
            </div>
        </div>
    );
}

export default SignUpForm;
