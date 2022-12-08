import classes from "./Checkout.module.css";
import ListContext from "../../store/listContext"
import { useContext, useState } from "react";
import MiniCard from "../../components/UI/Card/MiniCard";
import DeliveryForm from "./DeliveryForm";
import LoginForm from "../login/LoginForm";
import PaymentMethod from "./PaymentMethod";
import { FaAngleDoubleDown } from "react-icons/fa";
import authContext from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
const Checkout = () => {
    const { itemsCart, total, clearCart } = useContext(ListContext);
    const { isLoggedIn, userInfo, token } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [loginHandler, setLoginHandler] = useState({
        formIsValid: false,
        orderDetails: {
            enteredName: "",
            enteredAddress: "",
            enteredEmail: "",
            enteredPhone: "",
            paymentMethod: "COD",
            order: { itemsCart },
        },
    });

    const [deliveryHandler, setDeliveryHandler] = useState({
        formIsValid: false,
        orderDetails: {
            enteredName: "",
            enteredAddress: "",
            enteredEmail: "",
            enteredPhone: "",
            paymentMethod: "",
            total: "",
            order: [],
        },
    });
    let url;
    let orderInfo;
    const orderHandler = () => {
        if (!isLoggedIn) {
            orderInfo = JSON.stringify({
                fullname: deliveryHandler.orderDetails.enteredName,
                email: deliveryHandler.orderDetails.enteredEmail,
                phone: deliveryHandler.orderDetails.enteredPhone,
                address: deliveryHandler.orderDetails.enteredAddress,
                orders: deliveryHandler.orderDetails.order,
                total: deliveryHandler.orderDetails.total,
            });
            url = "https://zakimeal.onrender.com/orders/anonym-order";
        } else {
            url = "https://zakimeal.onrender.com/orders/owner-order";
            orderInfo = JSON.stringify({
                fullname: userInfo.fullname,
                email: userInfo.email,
                phone: userInfo.phone,
                address: userInfo.address,
                orders: itemsCart.map((e) => {
                    return {
                        meal: e.title,
                        price: e.price,
                        quantity: e.quantity,
                    };
                }),
                total,
            });
        }

        async function sendOrder() {
            setIsLoading(true);
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: orderInfo,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${isLoggedIn ? token : ""}`,
                    },
                });
                const data = await response.json();
                navigate("/thankyou");

                if (!response.ok) {
                    throw new Error(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        sendOrder();
        clearCart();
    };

    const articles = itemsCart.map((item) => {
        return (
            <article className={classes.items} key={item.id}>
                <div className={classes.mealName}>{item.title}</div>
                <div className={classes.price}>{item.price}$</div>
                <div className={classes.quantity}>x{item.quantity}</div>
            </article>
        );
    });

    const [selected, setSelected] = useState(
        isLoggedIn ? "login" : "deliveryInfo"
    );

    if (isLoading) {
        return (
            <section className={classes.checkout}>
                <div className={classes.title}>
                    <h2>Checkout</h2>
                </div>
                <LoadingSpinner size={"large"} />
            </section>
        );
    }
    return (
        <section className={classes.checkout}>
            <div className={classes.title}>
                <h2>Checkout</h2>
            </div>

            <div className={classes.container}>
                <div className={classes.col}>
                    <div className={`${classes.accordion_collapse}`}>
                        <div
                            className={classes.accor_header}
                            id="login"
                            onClick={(e) =>
                                selected === "login"
                                    ? setSelected("")
                                    : setSelected("login")
                            }
                        >
                            {!isLoggedIn ? (
                                <h4>You already have an account? </h4>
                            ) : (
                                <h4>Delivery info : </h4>
                            )}
                            <FaAngleDoubleDown />
                        </div>
                        {!isLoggedIn ? (
                            <div
                                className={`${classes.accor_body_login} ${
                                    selected === "login" ? classes.show : ""
                                }`}
                            >
                                <LoginForm setLoginHandler={setLoginHandler} />
                            </div>
                        ) : (
                            <div className={classes.deliveryDetailsSection}>
                                <div>
                                    Full Name : <span>{userInfo.fullname}</span>
                                </div>
                                <div>
                                    Email : <span>{userInfo.email}</span>
                                </div>
                                <div>
                                    Phone : <span>{userInfo.phone}</span>
                                </div>
                                <div>
                                    Address : <span>{userInfo.address}</span>
                                </div>
                                <button
                                    onClick={() => navigate("/profile/account")}
                                >
                                    edit info
                                </button>
                            </div>
                        )}
                    </div>

                    {!isLoggedIn && (
                        <div className={`${classes.accordion_collapse}`}>
                            <div
                                className={classes.accor_header}
                                id="deliveryInfo"
                                onClick={(e) =>
                                    selected === "deliveryInfo"
                                        ? setSelected("")
                                        : setSelected("deliveryInfo")
                                }
                            >
                                <h4>Delivery Address</h4>
                                <FaAngleDoubleDown />
                            </div>
                            <div
                                className={`${
                                    classes.accor_body_deliveryInfo
                                } ${
                                    selected === "deliveryInfo"
                                        ? classes.show
                                        : ""
                                }`}
                            >
                                <DeliveryForm
                                    setDeliveryHandler={setDeliveryHandler}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className={classes.col}>
                    <MiniCard>
                        <h3>Order details</h3>
                        {articles}
                    </MiniCard>
                    <MiniCard>
                        <h3>Payment Method</h3>
                        <PaymentMethod />
                    </MiniCard>
                    <MiniCard>
                        <div className={classes.total}>
                            <h3>Total: {total}$</h3>
                        </div>
                    </MiniCard>

                    <div className={classes.buttonsSection}>
                        <button
                            onClick={orderHandler}
                            type="submit"
                            disabled={
                                !isLoggedIn
                                    ? !deliveryHandler.formIsValid
                                    : !isLoggedIn
                            }
                        >
                            order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
