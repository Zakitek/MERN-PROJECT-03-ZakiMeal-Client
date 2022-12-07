import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";
import { CartContextProvider} from "./store/listContext";
import { AuthContextProvider } from "./store/authContext";

const container = document.getElementById("root");

createRoot(container).render(
    <AuthContextProvider> 
        <CartContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CartContextProvider>
    </AuthContextProvider>
);
