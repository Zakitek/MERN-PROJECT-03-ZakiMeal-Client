import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../store/authContext";
import classes from "./ThankYou.module.css";
const ThankYou = () => {
    const { isLoggedIn } = useContext(authContext);
    const navigate = useNavigate();
    return (
        <div className={classes.wrapper}>
            <h2>
                thanks for your purchase! <br/> Your Order will be processed as soon as
                possible.
            </h2>
            <ul className={classes.links}>
                <li onClick={() => navigate("/")}> HomePage</li>
                {isLoggedIn && (
                    <li onClick={() => navigate("/profile/orders")}> Your Order</li>
                )}
            </ul>
        </div>
    );
};

export default ThankYou;
