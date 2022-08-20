import React, { useContext, useEffect, useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import AuthContext from "../context/AuthCotext";

import "./Login.css";

const Login = () => {
    let { loginUser, registerUser, error } = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);

    const [inputs, setInputs] = useState([
        {
            name: "username",
            value: "",
            isValid: false,
        },
        {
            name: "email",
            value: "",
            isValid: false,
        },
        {
            name: "name",
            value: "",
            isValid: false,
        },
        {
            name: "password",
            value: "",
            isValid: false,
        },
    ]);
    const [disabled, setDisabled] = useState(true);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        setReset(false);
    }, [reset, error]);

    useEffect(() => {
        setDisabled(() => {
            let value = false;
            if (isLogin) {
                if (
                    inputs[0].isValid === false ||
                    inputs[3].isValid === false
                ) {
                    return true;
                }
            } else {
                inputs.forEach((input) => {
                    if (input.isValid === false) {
                        value = true;
                    }
                });
            }
            return value;
        });
    }, [inputs, isLogin]);

    const handleInputChange = (input) => {
        setInputs((prevInputs) =>
            prevInputs.map((item) => {
                if (item.name === input.name) {
                    item = {
                        ...item,
                        value: input.value,
                        isValid: input.isValid,
                    };
                }
                return item;
            })
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!disabled) {
            if (isLogin) {
                loginUser(e);
            } else {
                registerUser(e);
            }
        }
    };

    return (
        <div className="login--form--container">
            <h3>{!isLogin ? "Create new account" : "Login to the site"}</h3>
            {isLogin ? (
                <form onSubmit={handleFormSubmit} className="login--form">
                    <Input
                        placeholder="Enter your username"
                        id="username"
                        value={inputs[0].value}
                        send={handleInputChange}
                        reset={reset}
                    />
                    <Input
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        type="password"
                        value={inputs[3].value}
                        send={handleInputChange}
                        reset={reset}
                    />
                    <Button type="submit" value="Login" disabled={disabled} />
                </form>
            ) : (
                <form onSubmit={handleFormSubmit} className="login--form">
                    <Input
                        placeholder="Enter your username"
                        id="username"
                        value={inputs[0].value}
                        send={handleInputChange}
                        reset={reset}
                    />
                    <Input
                        placeholder="Enter your email"
                        id="email"
                        value={inputs[1].value}
                        send={handleInputChange}
                        reset={reset}
                    />
                    <Input
                        placeholder="Enter your name"
                        id="name"
                        name="name"
                        value={inputs[2].value}
                        send={handleInputChange}
                        reset={reset}
                    />
                    <Input
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        type="password"
                        value={inputs[3].value}
                        send={handleInputChange}
                        reset={reset}
                    />

                    <Button type="submit" value="Sing up" disabled={disabled} />
                </form>
            )}
            <button
                className="login--form--switch"
                onClick={() => setIsLogin((prevValue) => !prevValue)}
            >
                {isLogin ? "Create account" : "Login"}
            </button>
        </div>
    );
};

export default Login;
