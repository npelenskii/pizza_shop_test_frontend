import React, { useContext, useState } from "react";

import MainContext from "../context/MainContext";
import "./OrderCard.css";
import OrderPizzaCard from "./OrderPizzaCard";

const DATE_OPTIONS = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
};

const OrderCard = (props) => {
    const { copyOrderToCart } = useContext(MainContext);

    const [showOrder, setShowOrder] = useState(false);

    let date = new Date(props.created_at);

    const orderPizzaItem = props.order_list.map((pizzaItem, counter) => (
        <OrderPizzaCard key={counter} {...pizzaItem} />
    ));

    return (
        <div className="order--card--container">
            <h3>Order #{props.id}</h3>
            <h5>{props.address}</h5>
            <h5 className="order--card--date">
                {date.toLocaleDateString("en-UK", DATE_OPTIONS)}
            </h5>
            <button
                className="form--button"
                onClick={() => setShowOrder((prevValue) => !prevValue)}
            >
                {showOrder ? "Hide" : "Show"}
            </button>
            {showOrder && (
                <div className="order--card--pizza--container">
                    <h3>Pizza List</h3>
                    <div
                        className="order---pizza--button--container"
                        onClick={() => copyOrderToCart(props.order_list)}
                    >
                        <h4>Copy order</h4>
                    </div>
                    {orderPizzaItem}
                </div>
            )}
        </div>
    );
};

export default OrderCard;
