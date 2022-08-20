import React, { useContext, useState } from "react";

import MainContext from "../context/MainContext";

import "./CreationConstructor.css";

const INGRADIENTS = [
    "cheese",
    "pepperoni",
    "bacon",
    "peppers",
    "olives",
    "chicken",
];

const CreationConstructor = (props) => {
    const { createPizza } = useContext(MainContext);

    const [pizza, setPizza] = useState({
        name: "YourPizza",
        ingradients: [],
    });

    const toggleIngradient = (ingradient) => {
        if (pizza.ingradients.indexOf(ingradient) === -1) {
            setPizza((prevValue) => ({
                ...prevValue,
                ingradients: [...prevValue.ingradients, ingradient],
            }));
        } else {
            setPizza((prevValue) => ({
                ...prevValue,
                ingradients: prevValue.ingradients.filter(
                    (ing) => ing !== ingradient
                ),
            }));
        }
    };

    const resetPizza = () => {
        setPizza({
            name: "YourPizza",
            ingradients: [],
        });
    };

    const ingradientsChooseElements = INGRADIENTS.map((ingradient) => (
        <div
            key={ingradient}
            className="creation--contsructor--choose--item--container"
            onClick={() => toggleIngradient(ingradient)}
        >
            <img
                src={`../media/${ingradient}-small.png`}
                alt={ingradient}
                className="creation--contsructor--choose--item--img"
            />
            <h3>{ingradient}</h3>
        </div>
    ));

    const ingradientsElements = pizza.ingradients.map((ingradient, count) => (
        <img
            key={count}
            src={`../media/${ingradient}-big.png`}
            alt={ingradient}
            className={`creation--contsructor--schema--${ingradient}--img`}
        />
    ));

    return (
        <React.Fragment>
            <div className="creation--constructor--choose">
                {ingradientsChooseElements}
            </div>
            <div className="creation--constructor--schema">
                <img
                    src="../media/pizza-crust-1.png"
                    alt="clearpizza"
                    className="creation--constructor--schema--pizza--img"
                />
                <img
                    src="../media/sauce.png"
                    alt="sauce"
                    className="creation--constructor--schema--sauce--img"
                />
                {ingradientsElements}
                <button
                    className="creation--constructor--schema--button"
                    onClick={() => {
                        createPizza(pizza, props.size);
                        resetPizza();
                    }}
                >
                    Order now
                </button>
            </div>
        </React.Fragment>
    );
};

export default CreationConstructor;
