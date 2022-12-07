import classes from "./Header.module.css";
import CartBox from "./CartBox";
import { useContext, useRef, useState } from "react";
import ListContext from "../store/listContext";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import authContext from "../store/authContext";
const Header = () => {
    const { isLoggedIn, logout } = useContext(authContext);
    const tabRef = useRef();
    const [showBar, setToggleBar] = useState(false);
    let { itemsCart, totalQuantity } = useContext(ListContext);

    const toggleHandler = () => {
        setToggleBar(false);
    };

    const checkoutHandler = () => {
        setToggleBar(false);
    };
    const barStyle = showBar ? classes.showBar : "";

    return (
        <header>
            <div className={classes.header__container}>
                <div className={classes.logo}>
                    <Link to={""}>ZakiMeals</Link>
                </div>
                <nav className={barStyle}>
                    {!isLoggedIn && (
                        <div className={classes.signup__Section}>
                            <Link to={"signup"}>
                                <button
                                    className={classes.btn}
                                    onClick={toggleHandler}
                                >
                                    New account
                                </button>
                            </Link>
                        </div>
                    )}

                    {!isLoggedIn && (
                        <div className={classes.login__Section}>
                            <Link to={"login"}>
                                <button
                                    className={classes.btn}
                                    onClick={toggleHandler}
                                >
                                    Login
                                </button>
                            </Link>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div className={classes.login__Section}>
                            <Link to={"profile/account"}>
                                <button
                                    className={classes.btn}
                                    onClick={toggleHandler}
                                >
                                    Profile
                                </button>
                            </Link>
                        </div>
                    )}

                    {itemsCart.length !== 0 && (
                        <div className={classes.checkout__section}>
                            <Link to={"checkout"}>
                                <button
                                    onClick={checkoutHandler}
                                    className={classes.btn}
                                >
                                    Checkout
                                </button>
                            </Link>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div className={classes.signup__Section}>
                            <Link to={""}>
                                <button
                                    className={classes.btn}
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </Link>
                        </div>
                    )}
                </nav>
                <CartBox totalQuantity={totalQuantity} />
                <div
                    className={classes.bar}
                    ref={tabRef}
                    onClick={() => {
                        setToggleBar((prev) => !prev);
                    }}
                >
                    <FaBars></FaBars>
                </div>
            </div>
        </header>
    );
};

export default Header;
