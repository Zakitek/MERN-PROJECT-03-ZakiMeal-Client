import classes from "./Button.module.css";
const Button = ({ children,onClick }) => {
    return (
        <button className={classes.Button} onClick={onClick}  >
            {children}
        </button>
    );
};

export default Button;
