import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import classes from "./CartBox.module.css";
import ListContext from "../store/listContext";
const CartBox = ({ totalQuantity }) => {
    const { setShowModal } = useContext(ListContext);

    const [cartTrigger, setCartTrigger] = useState(false);

    useEffect(() => {
        setCartTrigger(true);
        const timer = setTimeout(() => {
            setCartTrigger(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [totalQuantity]);

    const cartBox = classes.cartBox;
    const triggerCart = classes.triggerCart;

    return (
        <div className={classes.addToCartSection}>
            <button
                className={`${cartBox} ${
                    cartTrigger ? triggerCart : ""
                } cartButton`}
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <div className={classes.cartIcon}>
                    <FaShoppingCart></FaShoppingCart>
                </div>
                <span className={classes.yourCartText}>Your Cart</span>
                <div className={classes.count_cart}>
                    <span>{totalQuantity}</span>
                </div>
            </button>
        </div>
    );
};

export default CartBox;
