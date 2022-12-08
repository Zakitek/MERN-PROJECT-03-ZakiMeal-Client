import CartModal from "./components/UI/Modal/CartModal";
import Menu from "./components/Menu";
import Card from "./components/UI/Card/Card";
import { useContext } from "react";
import ListContext from "./store/listContext";
import Checkout from "./Pages/Checkout/Checkout";
import ThankYou from "./Pages/ThankYou/ThankYou";
import SignUp from "./Pages/signUp/SignUp";
import Login from "./Pages/login/Login";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProfileAccount from "./Pages/Profile/ProfileAccount";
import authContext from "./store/authContext";
import { ProfileOrders } from "./Pages/Profile/ProfileOrders";
import Layout from "./components/layout/Layout";
import AnimatedCard from "./components/UI/Card/AnimatedCard";
import Intro from "./components/Intro";
function App() {
    const location = useLocation();
    const { showModal, itemsCart } = useContext(ListContext);
    const { isLoggedIn } = useContext(authContext);

    return (
        <>
            {showModal && <CartModal />}
            <Layout>
                <div className="container">
                    <Routes location={location} key={location.pathname}>
                        <Route
                            path=""
                            element={
                                <>
                                    <Intro />
                                    <div className="title">Menu</div>
                                    <AnimatedCard>
                                        <Menu />
                                    </AnimatedCard>
                                </>
                            }
                        />

                        {itemsCart.length !== 0 && (
                            <Route
                                path="checkout"
                                element={
                                    <AnimatedCard>
                                        <Checkout />
                                    </AnimatedCard>
                                }
                            />
                        )}

                        <Route
                            path="thankyou"
                            element={
                                <AnimatedCard>
                                    <ThankYou />
                                </AnimatedCard>
                            }
                        />
                        {!isLoggedIn && (
                            <Route
                                path="signup"
                                element={
                                    <AnimatedCard>
                                        <SignUp />
                                    </AnimatedCard>
                                }
                            />
                        )}
                        {!isLoggedIn && (
                            <Route
                                path="login"
                                element={
                                    <AnimatedCard>
                                        <Login />
                                    </AnimatedCard>
                                }
                            />
                        )}
                        {isLoggedIn && (
                            <Route
                                path="profile/account"
                                element={
                                    <AnimatedCard>
                                        <ProfileAccount />
                                    </AnimatedCard>
                                }
                            />
                        )}
                        {isLoggedIn && (
                            <Route
                                path="profile/orders"
                                element={
                                    <AnimatedCard>
                                        <ProfileOrders />
                                    </AnimatedCard>
                                }
                            />
                        )}

                        <Route path="*" element={<Navigate to="" replace />} />
                    </Routes>
                </div>
            </Layout>
        </>
    );
}

export default App;
