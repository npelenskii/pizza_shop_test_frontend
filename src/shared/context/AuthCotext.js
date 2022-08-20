import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import { useHttpClient } from "../hooks/http-hook";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    let [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const navigate = useNavigate();

    useEffect(() => {
        updateToken();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const firstLoadLogin = async () => {
            if (authTokens?.updateToken) {
                try {
                    await updateToken();
                } catch (error) {
                    logoutUser();
                }
            }
        };
        firstLoadLogin();
        // eslint-disable-next-line
    }, []);

    let loginUser = async (e) => {
        e.preventDefault();
        let responseData;
        try {
            responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/token/`,
                "POST",
                JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            setAuthTokens(responseData);
            setUser(jwt_decode(responseData.access));
            localStorage.setItem("authTokens", JSON.stringify(responseData));
            navigate("/");
        } catch (err) {}
    };

    let registerUser = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/v1/register/`,
                "POST",
                JSON.stringify({
                    username: e.target.username.value,
                    first_name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            await loginUser(e);
        } catch (error) {}
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/");
    };

    let updateToken = async () => {
        let responseData;
        try {
            responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/token/refresh/`,
                "POST",
                JSON.stringify({ refresh: authTokens.refresh }),
                {
                    "Content-Type": "application/json",
                }
            );
            setAuthTokens(responseData);
            setUser(jwt_decode(responseData.access));
            localStorage.setItem("authTokens", JSON.stringify(responseData));
        } catch (error) {
            console.log("hello");
            logoutUser();
        }
    };

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
        isLoading: isLoading,
        error: error,
        clearError: clearError,
    };

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4;

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {error && <Modal text={error} ClearError={clearError} />}
            {children}
        </AuthContext.Provider>
    );
};
