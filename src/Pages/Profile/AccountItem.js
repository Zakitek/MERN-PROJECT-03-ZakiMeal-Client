import React, { useState, useContext } from "react";
import classes from "./AccountItem.module.css";
import authContext from "../../store/authContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

//I will be using react-hook-form & yup for form Validaiton.

export default function ItemInfo({ inputName }) {
    let schema;
    if (
        inputName === "fullname" ||
        inputName === "phone" ||
        inputName === "password"
    ) {
        schema = yup.object().shape({
            [inputName]: yup.string().required(),
        });
    } else if (inputName === "address") {
        schema = yup.object().shape({
            [inputName]: yup.string().min(10).required(),
        });
    } else if (inputName === "email") {
        schema = yup.object().shape({
            [inputName]: yup.string().email().required(),
        });
    }

    const { userInfo, token, setUserInfo } = useContext(authContext);
    const [edit, setEdit] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onEditHandler() {
        setIsloading(false);
        setEdit(true);
        setTimeout(() => {
            setFocus(inputName);
        }, 100);
    }

    async function editHandler(data) {
        try {
            setIsloading(true);
            const response = await fetch(
                "https://zakimeal.onrender.com/users/profile",
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const userInfo = await response.json();

            if (!response.ok) {
                throw new Error(userInfo.error);
                /*  const message = `An error occurred: ${response.statusText}`;
                throw new Error(message); */
            }
            setUserInfo(userInfo);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            setIsloading(false);
            setEdit(false);
        } catch (error) {
            setError(inputName, {
                type: "server",
                message: error.message,
            });
            setIsloading(false);
        }
    }
    return (
        <>
            <div className={classes.edit_item}>
                <div className={classes.info}>
                    <div className={classes.key_value}>
                        <div className={`${classes.inputName} ${classes.hide}`}>
                            <span>{inputName}</span>:
                        </div>
                        {inputName === "password" ? (
                            <div> {!edit && "--------"}</div>
                        ) : (
                            ""
                        )}
                        <div> {!edit && userInfo[inputName]}</div>
                    </div>
                    {edit && (
                        <div className={classes.edit_form}>
                            <form onSubmit={handleSubmit(editHandler)}>
                                <div className={classes.form_control}>
                                    <input
                                        {...register(inputName)}
                                        type={
                                            inputName === "password"
                                                ? "password"
                                                : "text"
                                        }
                                        placeholder={userInfo[inputName]}
                                        name={inputName}
                                    />

                                    <button className={`${classes.btn_edit} `}>
                                        {isLoading && (
                                            <LoadingSpinner size="small" />
                                        )}
                                        {!isLoading && "edit"}
                                    </button>
                                    <button
                                        className={classes.cancel}
                                        onClick={() => setEdit(false)}
                                    >
                                        {!isLoading && "-"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {!edit && (
                        <div
                            className={classes.edit_link}
                            onClick={onEditHandler}
                        >
                            edit
                        </div>
                    )}
                </div>

                {errors[inputName] && edit && (
                    <div className={classes.error}>
                        {errors[inputName].message}
                    </div>
                )}
            </div>
        </>
    );
}
