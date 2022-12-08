import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../store/authContext";
import { useInput } from "../../Hooks/useInput";
import classes from "./LoginForm.module.css";

function LoginForm({ setLoginHandler }) {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(authContext);
    const navigate = useNavigate();
    const [error, setError] = useState({
        error_status: false,
        error_message: "",
    });

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordPattern = /./;
    /*  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/ */ // Form Validation
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

    const currentPAH = window.location.pathname;

    const userInfo = {
        email: enteredEmail,
        password: enteredPassword,
    };

    let formIsValid = false;
    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

   /*  useEffect(() => {
        if (currentPAH === "/checkout") {
            setLoginHandler((prevState) => {
                return { ...prevState, formIsValid };
            });
        }
    }, [setLoginHandler, formIsValid]);
     */

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setEnteredEmail("");
        setEnteredPassword("");
        setEmailIsTouched(false);
        setPasswordIsTouched(false);

        let url = "https://zakimeal.onrender.com/users/login";
        const sendData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(userInfo),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data);
                }
                const { token, expiresIn, user } = data;
             /*    if (currentPAH === "/checkout") {
                    setLoginHandler((prevState) => {
                        return {
                            ...prevState,
                            orderDetails: {
                                enteredName: user.fullname,
                                enteredAddress: user.address,
                                enteredEmail: user.email,
                                enteredPhone: user.phone,
                                paymentMethod: "COD",
                                order: { itemsCart },
                            },
                        };
                    });
                } */

                if (token && expiresIn && user) {
                    setError(() => {
                        return {
                            error_status: false,
                            error_message: "",
                        };
                    });
                    setIsLoading(false);
                    login(token, expiresIn, user);
                    if (currentPAH === "/login") {
                        navigate("/profile");
                    } else if (currentPAH === "/Checkout") {
                        console.log("do something");
                    }
                } else {
                    throw new Error();
                }
            } catch (error) {
                setIsLoading(false);
                setError(() => {
                    return { error_status: true, error_message: error.message };
                });
            }
        };

        sendData();

        // user validation
    };

    if (isLoading) {
        return (
            <div>
                <div className={classes.login__section}>
                    <div> is loading ...</div>
                    <div className={classes.buttonsSection}>
                        <button
                            type="submit"
                            disabled={!formIsValid}
                            form="myform"
                            
                        >
                            login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={classes.login__section}>
                <form
                    id="myform"
                    className={classes.form__login}
                    onSubmit={formSubmitHandler}
                >
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
                        <label htmlFor="phone">Password: </label>
                        <input
                            type="password"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            className={
                                passwordHasError ? classes.errorInput : ""
                            }
                            autoComplete="on"
                        />
                        {passwordHasError && (
                            <h4 className={classes.errorMsg}>
                                Password is not valid
                            </h4>
                        )}
                    </div>
                </form>
                {error.error_status && (
                    <div className={classes.error}>
                        <h2>Error : {error.error_message}</h2>
                    </div>
                )}

                <div className={classes.buttonsSection}>
                    <button type="submit" disabled={!formIsValid} form="myform">
                        login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
