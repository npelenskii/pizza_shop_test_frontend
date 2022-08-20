import React, { useEffect, useState } from "react";
import validator from "validator";

import "./Input.css";

const Input = (props) => {
    const [input, setInput] = useState({
        value: "",
        isValid: false,
        isTouched: false,
    });

    useEffect(() => {
        if (props.value) {
            setInput({
                value: props.value,
                isValid: validate(props.value),
                isTouched: true,
            });
        }
        // eslint-disable-next-line
    }, [props.value]);

    useEffect(() => {
        if (props.reset) {
            setInput({
                value: "",
                isValid: false,
                isTouched: false,
            });
        }
    }, [props.reset]);

    const validate = (data) => {
        if (data) {
            if (props.id === "name" && data.length > 1) {
                return true;
            } else if (props.id === "username" && data.length >= 3) {
                return true;
            } else if (
                props.id === "phone" &&
                validator.isMobilePhone(data, ["uk-UA"])
            ) {
                return true;
            } else if (props.id === "email" && validator.isEmail(data)) {
                return true;
            } else if (props.id === "password" && data.length >= 8) {
                return true;
            } else if (props.id === "address" && data.length > 3) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const touchHandler = (event) => {
        const LetIsValid = validate(event.target.value);
        setInput((prevVal) => ({
            ...prevVal,
            isTouched: true,
            isValid: LetIsValid,
        }));
        props.send({
            name: props.id,
            value: input.value,
            isValid: LetIsValid,
        });
    };

    const changeHandler = (event) => {
        const LetIsValid = validate(event.target.value);

        setInput((prevVal) => ({
            ...prevVal,
            value: event.target.value,
            isValid: LetIsValid,
        }));

        props.send({
            name: props.id,
            value: event.target.value,
            isValid: LetIsValid,
        });
    };

    return (
        <input
            className={
                !input.isValid && input.isTouched ? "input-failed" : "input"
            }
            id={props.id}
            name={props.name}
            type={props.type || "text"}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={input.value}
        />
    );
};

export default Input;
