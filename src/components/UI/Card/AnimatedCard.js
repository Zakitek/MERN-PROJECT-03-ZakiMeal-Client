import classes from "./Card.module.css";
import { motion } from "framer-motion";

const AnimatedCard = ({ children }) => {
    return (
        <motion.div
            className={`${classes.card} ${classes.card_items}`}
            initial={{
                opacity: 0,
                marginTop: "200px",
            }}
            animate={{
                opacity: 1,
                marginTop: "50px",
                transition: { duration: 0.3 },
            }}
        >
            {children}
        </motion.div>
    );
};
export default AnimatedCard;
