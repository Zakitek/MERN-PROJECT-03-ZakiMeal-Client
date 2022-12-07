import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

const authContext = createContext({
    userInfo: {},
    setUserInfo: (userInfo) => {},
    isLoggedIn: false,
    token: "",
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    let initialToken = localStorage.getItem("token");
    let initialUserInfo = localStorage.getItem("userInfo");

    const [token, setToken] = useState(initialToken ? initialToken : "");
    const [userInfo, setUserInfo] = useState(
        initialUserInfo ? JSON.parse(initialUserInfo) : {}
    );
    const isLoggedIn = !!token;

    function loginHandler(token, expiresIn, user) {
        let futureTime = Date.now() + expiresIn * 1000;
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("futureTime", futureTime);
        setUserInfo(user);
    }
    useEffect(() => {
        if (token) {
            let timeRemaining = localStorage.getItem("futureTime") - Date.now();
            setTimeout(logoutHandler, timeRemaining);
        }
    }, [token]);

    function logoutHandler() {
        setToken("");
        setUserInfo({});
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("futureTime");
    }
    const contextValues = {
        isLoggedIn: isLoggedIn,
        token: token,
        login: loginHandler,
        logout: logoutHandler,
        userInfo,
        setUserInfo,
    };

    return (
        <authContext.Provider value={contextValues}>
            {children}
        </authContext.Provider>
    );
};

export default authContext;
