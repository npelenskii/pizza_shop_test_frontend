import React, { useContext } from "react";

import MainContext from "../context/MainContext";

import "./OrderPizzaCard.css";

const OrderPizzaCard = (props) => {
    const { addToCart } = useContext(MainContext);
    const ingradientsElement = props.pizza.ingradients.map((item, counter) => {
        if (counter !== 0) {
            return ", " + item.charAt(0).toUpperCase() + item.slice(1);
        } else {
            return item.charAt(0).toUpperCase() + item.slice(1);
        }
    });
    return (
        <div className="order--pizza--card--container">
            <img
                src={props.pizza.pizza_image.thumbnail}
                alt={props.pizza.name}
            />
            <div className="order--pizza--description--card--container">
                <div className="order--pizza--description--card--text--container">
                    <h4>{props.pizza.name}</h4>
                    <p>{props.pizza.ready_time} min</p>
                </div>

                <div className="pizza-item-ingradients-container">
                    <p>{ingradientsElement}</p>
                </div>
            </div>
            <div
                className="order---pizza--button--container"
                onClick={() => addToCart(props.pizza.id, props.size)}
            >
                <h4>Add to Cart</h4>
            </div>
        </div>
    );
};

export default OrderPizzaCard;
