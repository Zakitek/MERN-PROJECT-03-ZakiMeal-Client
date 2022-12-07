import { useState } from "react";
import classes from "./Login.module.css";
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <>
            <section className={classes.login}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h2>Login</h2>
                    </div>

                    <div>
                        <div className={classes.login__section}>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
