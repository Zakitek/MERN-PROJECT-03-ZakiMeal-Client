import React, { useContext, useEffect } from "react";
import ListContext from "../../store/listContext";
import { useInput } from "../../Hooks/useInput";
import classes from "./DeliveryForm.module.css";

function DeliveryForm({ setDeliveryHandler }) {
    const { itemsCart, total } = useContext(ListContext);

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
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

    useEffect(() => {
        if (nameIsValid && emailIsValid && phoneIsValid && enteredAddress) {
            setDeliveryHandler({
                formIsValid: true,
                orderDetails: {
                    enteredName,
                    enteredAddress,
                    enteredEmail,
                    enteredPhone,
                    paymentMethod: "COD",
                    total,
                    order: itemsCart.map((e) => {
                        return {
                            meal: e.title,
                            price: e.price,
                            quantity: e.quantity,
                        };
                    }),
                },
            });
        } else {
            setDeliveryHandler((prevState) => {
                return { ...prevState, formIsValid: false };
            });
        }
    }, [
        nameIsValid,
        emailIsValid,
        phoneIsValid,
        enteredAddress,
        enteredName,
        enteredEmail,
        enteredPhone,
        setDeliveryHandler,
        itemsCart,
        total,
    ]);

    /*  const formSubmitHandler = (e) => {
        e.preventDefault();
        setEnteredName("");
        setEnteredPhone("");
        setEnteredAddress("");
        setEnteredEmail("");
        setNameIsTouched(false);
        setAddressIsTouched(false);
        setEmailIsTouched(false);
        setPhoneIsTouched(false);

        const user = {
            enteredName,
            enteredAddress,
            enteredEmail,
            enteredPhone,
        };


        console.log("validate with RESTAPI");

        // user validation
    }; */

    return (
        <div>
            <div className={classes.delivery__section}>
                <form className={classes.form__delivery}>
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
        </div>
    );
}

export default DeliveryForm;
