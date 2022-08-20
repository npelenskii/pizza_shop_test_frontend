import { useContext, useState } from "react";

import MainContext from "../context/MainContext";
import SizeButton from "./SizeButton";

import "./MenuCard.css";

const MenuCard = (props) => {
    const { addToCart } = useContext(MainContext);
    const [size, setSize] = useState("M");

    const ingradientsElement = props.ingradients.map((item, counter) => {
        if (counter !== 0) {
            return ", " + item.charAt(0).toUpperCase() + item.slice(1);
        } else {
            return item.charAt(0).toUpperCase() + item.slice(1);
        }
    });

    return (
        <div className="pizza-item-container">
            <img src={props.pizza_image.thumbnail} alt={props.name} />
            <div className="pizza-item-heading-container">
                <h4>{props.name}</h4>
                <p>{props.ready_time} min</p>
            </div>
            <div className="pizza-item-ingradients-container">
                <p>{ingradientsElement}</p>
            </div>
            <div className="pizza-size-container">
                <SizeButton
                    text="S"
                    size="32px"
                    current={size === "S"}
                    changeSize={() => setSize("S")}
                />
                <SizeButton
                    text="M"
                    size="32px"
                    current={size === "M"}
                    changeSize={() => setSize("M")}
                />
                <SizeButton
                    text="L"
                    size="32px"
                    current={size === "L"}
                    changeSize={() => setSize("L")}
                />
            </div>
            <h3>{props[`price_${size.toLowerCase()}`]}$</h3>
            <div
                className="pizza--order--container"
                onClick={() => addToCart(props.id, size)}
            >
                <h4>Add to Cart</h4>
            </div>
        </div>
    );
};

export default MenuCard;
