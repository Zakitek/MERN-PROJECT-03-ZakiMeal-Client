import classes from "./SignUp.module.css";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
    return (
        <>
            <section className={classes.signup}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h2>Register a New Account</h2>
                    </div>
                    <div className={classes.signup__section}>
                        <SignUpForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
