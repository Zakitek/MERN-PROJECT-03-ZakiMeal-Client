import classes from "./Card.module.css";
import { motion } from "framer-motion";

const Card = ({ children }) => {
    return (
        <motion.div className={`${classes.card} ${classes.card_items}`}>
            {children}
        </motion.div>
    );
};

export default Card;
