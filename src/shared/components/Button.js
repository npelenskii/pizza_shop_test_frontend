import React from "react";

import "./Button.css";

const Button = (props) => {
    return (
        <button
            type={props.type}
            className={
                !props.disabled ? "form--button" : "form--button disabled"
            }
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
};

export default Button;
