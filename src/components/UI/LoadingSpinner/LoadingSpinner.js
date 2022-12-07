import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({size}) => {
    let spinnerClass;
    if (size === "small") {
        spinnerClass = classes.small;
    } else if (size === "medium") {
        spinnerClass = classes.medium;
    } else if (size === "large") {
        spinnerClass = classes.large;
    }
    return (
        <div className={classes.centered}>
            <div className={`${classes.spinner} ${spinnerClass}`}></div>
        </div>
    );
};

export default LoadingSpinner;
