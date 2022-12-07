import React, { useState } from "react";
import classes from "./PaymentMethod.module.css";
import { FaCcPaypal, FaCreditCard } from "react-icons/fa";
import paypal from "../../Images/paypal.png";
import creditCard from "../../Images/R.png";
import cod from "../../Images/cashOnDelivery.png";

function PaymentMethod() {
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    const [activeCodBtn, setActiveBtn] = useState(true);
    const [activePaypalBtn, setActivePaypalBtn] = useState(false);
    const [activeCreditCardBtn, setActiveCreditCardBtn] = useState(false);

    return (
        <div className={classes.paymentMethods}>
            <div className={classes.PaymentMehtodIcons}>
                <img
                    alt="Cash On Delivery"
                    src={cod}
                    className={`${classes.codIcon} ${
                        activeCodBtn ? classes.active : ""
                    }`}
                    onClick={() => {
                        setPaymentMethod("Cash On Delivery");
                        setActiveBtn(true);
                        setActivePaypalBtn(false);
                        setActiveCreditCardBtn(false);
                    }}
                />
            {/*     <img
                    alt="PayPal"
                    src={paypal}
                    className={`${classes.paypalIcon} ${
                        activePaypalBtn ? classes.active : ""
                    }`}
                    onClick={() => {
                        setPaymentMethod("Paypal");
                        setActiveBtn(false);
                        setActivePaypalBtn(true);
                        setActiveCreditCardBtn(false);
                    }}
                />
                <img
                    alt="CreditCard"
                    src={creditCard}
                    className={`${classes.CreditCardIcon} ${
                        activeCreditCardBtn ? classes.active : ""
                    }`}
                    onClick={() => {
                        setPaymentMethod("CreditCard");
                        setActiveBtn(false);
                        setActivePaypalBtn(false);
                        setActiveCreditCardBtn(true);
                    }}
                /> */}
            </div>
            {paymentMethod === "Cash On Delivery" && (
                <div className={classes.codSection}>
                    <h2>Cash On Delivery</h2>
                </div>
            )}
            {/* {paymentMethod === "Paypal" && (
                <div className={classes.PayPalSection}>
                    <button>Connect your paypal account</button>
                </div>
            )}
            {paymentMethod === "CreditCard" && (
                <div className={classes.CreditCardSection}>
                    <div className={classes.control}>
                        <label>Name On Card</label>
                        <input type="text"></input>
                    </div>
                    <div className={classes.control}>
                        <label>Card Number</label>
                        <input
                            type="text"
                            placeholder="0000-0000-0000-0000"
                        ></input>
                    </div>
                    <div className={classes.control}>
                        <label>cvv</label>
                        <input
                            type="password"
                            maxLength={3}
                            placeholder="***"
                        ></input>
                    </div>
                    <div className={classes.control}>
                        <label>Expiration Date</label>
                        <input type="month" placeholder="MM/YY"></input>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default PaymentMethod;
