import React, { useState } from "react";
import classes from "./ProfileAccount.module.css";
import AccountItem from "./AccountItem";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";

export const ProfileOrders = () => {
    const Navigate = useNavigate();
    const navLinks = [{ name: "Account" }, { name: "Orders" }];
    const userInfo = ["fullname", "email", "phone", "address", "password"];
    const [isActive, setIsactive] = useState("Orders");

    return (
        <div className={classes.profile_wrapper}>
            <ul className={classes.navLinks}>
                {navLinks.map((link) => {
                    return (
                        <li
                            id={`${
                                "Orders" === link.name ? classes.active : ""
                            }`}
                            onClick={() => {
                                    if (link.name !== "Orders") {
                                        Navigate("/profile/account");
                                    }
                                }}
                            key={link.name}
                        >
                            {link.name}
                        </li>
                    );
                })}
            </ul>

            {isActive === "Orders" && <Orders />}
        </div>
    );
};
