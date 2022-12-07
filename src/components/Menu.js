import { useContext, useEffect, useState } from "react";
import classes from "./Menu.module.css";
import React from "react";
import MenuItem from "./MenuItem";
import useHttp from "../Hooks/useHttp";
import { getAllMeals } from "../lib/api";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import authContext from "../store/authContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addMeal } from "../lib/api";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Intro from "./Intro";

const Menu = () => {
    const { sendRequest, status, data, error } = useHttp(getAllMeals, true);

    const [reRender, setReRender] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const { userInfo } = useContext(authContext);

    const handleReRender = () => {
        setReRender(!reRender); // state change will re-render parent
    };

    const navigate = useNavigate();

    const {
        sendRequest: SendMeal,
        status: AddMealStatus,
        data: addingData,
        error: addingerror,
    } = useHttp(addMeal, false);

    const schema = yup.object().shape({
        title: yup.string().min(5).max(20).required(),
        description: yup.string().min(5).max(50).required(),
        price: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setFocus,
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function addItemHandler(data) {
        await SendMeal(data);
        handleReRender();
        setIsAdding(false);
        reset();
    }

    useEffect(() => {
        sendRequest();
    }, [sendRequest, reRender]);

    const [isValid, setIsValid] = useState(false);

    function onChangeHandler(e) {
        if (e.target.value >= 1) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    if (status === "pending" && !error) {
        return (
            <div className="centered">
                <LoadingSpinner size="medium" />
            </div>
        );
    }

    if (error && status === "completed") {
        return <p className={classes.errorMsg}>something went wrong!</p>;
    }

    return (
        <>
            {!isAdding && userInfo.permission === "admin" && (
                <button
                    className={classes.addBtn}
                    onClick={() => setIsAdding(true)}
                >
                    +Add New Meal
                </button>
            )}

            {AddMealStatus === "pending" && (
                <div className="centered">
                    <LoadingSpinner size="medium" />
                </div>
            )}

            {isAdding && (
                <form
                    className={classes.add_form}
                    onSubmit={handleSubmit(addItemHandler)}
                >
                    <div className={classes.form_control}>
                        <label>Title: </label>
                        <input {...register("title")} maxLength="20" />

                        {errors["title"] && (
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
                            maxLength="50"
                        />

                        {errors["description"] && (
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
                            max={50}
                            min={0}
                        />

                        {errors["price"] && (
                            <div className={classes.error}>
                                {errors["price"].message}
                            </div>
                        )}
                    </div>
                    <button type="submit" className={classes.add_meal_btn}>
                        Add Meal
                    </button>
                    <button
                        type="button"
                        className={classes.cancel_btn}
                        onClick={() => setIsAdding(false)}
                    >
                        cancel
                    </button>
                </form>
            )}

            {!error &&
                status === "completed" &&
                data.map((e, i) => {
                    const { _id: id, title, description, price } = e;

                    return (
                        <MenuItem
                            onReRender={handleReRender}
                            id={id}
                            key={id}
                            title={title}
                            description={description}
                            price={price}
                            isValid={isValid}
                            setIsValid={setIsValid}
                            onChangeHandler={onChangeHandler}
                        />
                    );
                })}
        </>
    );
};

export default Menu;
