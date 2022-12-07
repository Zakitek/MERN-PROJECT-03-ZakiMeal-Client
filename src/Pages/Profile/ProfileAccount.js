import { useState } from "react";
import classes from "./ProfileAccount.module.css";
import AccountItem from "./AccountItem";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const Navigate = useNavigate();
    const navLinks = [{ name: "Account" }, { name: "Orders" }];
    const userInfo = ["fullname", "email", "phone", "address", "password"];
    const [isActive, setIsactive] = useState("Account");

    return (
        <>
            <div className={classes.profile_wrapper}>
                <ul className={classes.navLinks}>
                    {navLinks.map((link) => {
                        return (
                            <li
                                id={`${
                                    "Account" === link.name
                                        ? classes.active
                                        : ""
                                }`}
                                onClick={() => {
                                    if (link.name !== "Account") {
                                        Navigate("/profile/orders");
                                    }
                                }}
                                key={link.name}
                            >
                                {link.name}
                            </li>
                        );
                    })}
                </ul>
                {isActive === "Account" && (
                    <div className={classes.content}>
                        {userInfo.map((item) => {
                            return <AccountItem inputName={item} key={item} />;
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
