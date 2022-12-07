import Header from "../Header";
import classes from "./Layout.module.css";
import Intro from "../Intro";
import { Card } from "@material-ui/core";
const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className={classes.main}>{children}</main>
        </>
    );
};
export default Layout;
