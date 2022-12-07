import { useContext } from "react";
import authContext from "../store/authContext";
import classes from "./Intro.module.css";

const Intro = () => {
    const { userInfo } = useContext(authContext);

    return (
        <div className={classes.backIMG}>
            <div className={`${classes.card} ${classes.card_intro}`}>
                <h2>Delicious Food, Delivered to you</h2>
                <p>
                    choose your favorite meal from our broad selection of
                    available meals and enjoy a delicious luch or dinner at
                    home.
                </p>
                {userInfo.permission !== "admin" && (
                    <div className={classes.note}>
                        Login with the following credentials if you wanna get
                        Admin role so that you can edit/add/remove meals
                        <div>Email : admin@gmail.com</div>
                        <div>Password : 123</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Intro;
