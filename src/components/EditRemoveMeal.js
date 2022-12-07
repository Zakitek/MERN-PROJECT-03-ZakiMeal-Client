import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import classes from './EditRemoveMeal.module.css'
export const EditRemoveMeal = ({setIsEditing,setMealId,id,setShowConfirmationModal}) => {
    return (
        <div className={classes.control_meal}>
            <div className={classes.edit} onClick={() => setIsEditing(true)}>
                <FaRegEdit />
            </div>
            <div
                className={classes.remove}
                onClick={() => {
                    setMealId(id);
                    setShowConfirmationModal(true);
                }}
            >
                <FaRegTrashAlt />
            </div>
        </div>
    );
};
