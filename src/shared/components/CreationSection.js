import React, { useState } from "react";

import CreationConstructor from "./CreationConstructor";
import SizeButton from "./SizeButton";

import "./CreationSection.css";

const CreationSection = () => {
    const [size, setSize] = useState("M");

    const changeSize = (size) => {
        setSize(size);
    };

    return (
        <div className="creation-section-container">
            <h2>Select Your Size</h2>
            <div className="creation-size-container">
                <SizeButton
                    inverted
                    text="S"
                    size="48px"
                    current={size === "S"}
                    changeSize={() => changeSize("S")}
                />
                <SizeButton
                    inverted
                    text="M"
                    size="48px"
                    current={size === "M"}
                    changeSize={() => changeSize("M")}
                />
                <SizeButton
                    inverted
                    text="L"
                    size="48px"
                    current={size === "L"}
                    changeSize={() => changeSize("L")}
                />
            </div>
            <CreationConstructor size={size} />
        </div>
    );
};

export default CreationSection;
