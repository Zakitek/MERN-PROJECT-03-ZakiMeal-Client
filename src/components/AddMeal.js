import React from "react";
import classes from "./AddMeal.module.css";
import useHttp from "../Hooks/useHttp";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addMeal } from "../lib/api";
import { Link, Route, Routes } from "react-router-dom";

export const AddMeal = ({ isAdding, setIsAdding, handleReRender }) => {
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
        formState: { errors },
        setFocus,
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function addItemHandler(data) {
        setIsAdding(false);
        await SendMeal(data);
        handleReRender();
    }

    return (
        <>
           
           
          
        </>
    );
};
