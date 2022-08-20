import React from "react";

import "./SizeButton.css";

const SizeButton = (props) => {
    const buttonStyle = {
        height: props.size,
        width: props.size,
    };
    return (
        <div
            className={`size-button${props.current ? "-current" : "-normal"}${
                props.inverted ? "-inverted" : ""
            }`}
            style={buttonStyle}
            onClick={props.changeSize}
        >
            <p>{props.text}</p>
        </div>
    );
};

export default SizeButton;
