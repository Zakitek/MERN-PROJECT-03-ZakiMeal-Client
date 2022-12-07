import React, { useContext, useRef, useState } from "react";
import ListContext from "../store/listContext";
import classes from "./menuItem.module.css";
import useHttp from "../Hooks/useHttp";
import { deleteMeal, editMeal } from "../lib/api";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import ConfirmationModal from "./UI/Modal/ConfirmationModal";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditRemoveMeal } from "./EditRemoveMeal";
import authContext from "../store/authContext";

function MenuItem({
    id,
    title,
    description,
    price,
    onChangeHandler,
    isValid,
    setIsValid,
    onReRender,
}) {
    const schema = yup.object().shape({
        title: yup.string().min(5).max(20).required(),
        description: yup.string().min(5).max(50).required(),
        price: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { addToCart } = useContext(ListContext);
    const { userInfo } = useContext(authContext);

    const { showConfirmationModal, setShowConfirmationModal, setMealId } =
        useContext(ListContext);
    const { sendRequest, status, data, error } = useHttp(deleteMeal, false);

    const {
        sendRequest: sendEditedContent,
        status: edit_Status,
        data: edit_Response,
        error: edit_Error,
    } = useHttp(editMeal, false);

    const [isEditing, setIsEditing] = useState(false);

    async function editHandler(data) {
        await sendEditedContent({ id, content: data });
        setIsEditing(false);
        onReRender();
    }

    const refInput = useRef(null);
    const submitToCart = (e) => {
        e.preventDefault();
        const inputId = refInput.current.id;
        const inputQuantity = +refInput.current.value;
        const inputName = refInput.current.name;
        const inputPrice = +refInput.current.getAttribute("price");

        if (inputQuantity >= 1) {
            addToCart({
                id: inputId,
                title: inputName,
                quantity: inputQuantity,
                price: inputPrice,
            });
            setIsValid(false);
        } else {
            refInput.current.focus();
        }
    };
    if (status === "pending" || edit_Status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner size="medium" />
            </div>
        );
    }
    if (edit_Error) {
        return <div className="centered">{edit_Error}</div>;
    }
    return (
        <>
            {showConfirmationModal && (
                <ConfirmationModal
                    sendRequest={sendRequest}
                    onReRender={onReRender}
                />
            )}
            {isEditing && (
                <div className={classes.item}>
                    <form
                        className={classes.editing}
                        onSubmit={handleSubmit(editHandler)}
                    >
                        <div className={classes.form_control}>
                            <label>Title: </label>
                            <input
                                {...register("title")}
                                defaultValue={title}
                                maxLength="20"
                            />

                            {errors["title"] && isEditing && (
                                <div className={classes.error}>
                                    {errors["title"].message}
                                </div>
                            )}
                        </div>
                        <div className={classes.form_control}>
                            <label>Description: </label>

                            <input
                                {...register("description")}
                                type="text"
                                defaultValue={description}
                                maxLength="50"
                            />
                            {errors["description"] && isEditing && (
                                <div className={classes.error}>
                                    {errors["description"].message}
                                </div>
                            )}
                        </div>
                        <div className={classes.form_control}>
                            <label>Price: </label>

                            <input
                                {...register("price")}
                                type="number"
                                defaultValue={price}
                                max={50}
                                min={0}
                            />
                            {errors["price"] && isEditing && (
                                <div className={classes.error}>
                                    {errors["price"].message}
                                </div>
                            )}
                        </div>
                        <button type="submit" className={classes.editBtn}>
                            edit
                        </button>
                        <button
                            type="button"
                            className={classes.cancelBtn}
                            onClick={() => setIsEditing(false)}
                        >
                            cancel
                        </button>
                    </form>
                </div>
            )}
            {!isEditing && (
                <div className={classes.item}>
                    <div className={classes.itemInfo}>
                        <div className={classes.itemName}>{title}</div>
                        <div className={classes.itemDesc}>{description}</div>
                        <div className={classes.itemPrice}>{price}</div>
                    </div>
                    {userInfo.permission === "admin" && (
                        <EditRemoveMeal
                            setIsEditing={setIsEditing}
                            setMealId={setMealId}
                            id={id}
                            setShowConfirmationModal={setShowConfirmationModal}
                        />
                    )}

                    <div className={classes.addItemToCart}>
                        <form onSubmit={submitToCart}>
                            <div className={classes.amount}>
                                <div className={classes.amountTxt}>Amount</div>

                                <input
                                    ref={refInput}
                                    onChange={onChangeHandler}
                                    className={`${classes.inputAmount} ${
                                        isValid ? {} : classes.notValidInput
                                    }`}
                                    type="number"
                                    min={1}
                                    max={10}
                                    id={id}
                                    name={title}
                                    price={price}
                                />
                            </div>
                            <button>+Add</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default MenuItem;
