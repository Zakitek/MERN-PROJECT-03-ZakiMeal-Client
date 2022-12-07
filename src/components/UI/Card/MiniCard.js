import React from "react";
import classes from "./MiniCard.module.css";

function MiniCard(props) {
    return <div className={classes.card}>{props.children}</div>;
}

export default MiniCard;
