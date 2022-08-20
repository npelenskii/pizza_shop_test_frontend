import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

import CartCard from "../components/CartCard";
import OrderFrom from "../components/OrderFrom";
import MainContext from "../context/MainContext";

import "./Cart.css";

const Cart = () => {
    const { cartList, clearCart } = useContext(MainContext);
    const [orderDone, setOrderDone] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        let currPrice = 0;
        cartList.forEach((pizzaItem) => {
            currPrice += pizzaItem[`price_${pizzaItem.size.toLowerCase()}`];
        });
        setPrice(currPrice);
    }, [cartList]);

    const navigate = useNavigate();

    const orderPizzaElements = cartList.map((pizzaItem, count) => {
        return <CartCard key={count} {...pizzaItem} />;
    });

    const orderDoneHandler = () => {
        setOrderDone(true);
    };

    return (
        <div className="cart--container">
            {orderDone ? (
                <div className="cart--result--container">
                    <h2>Your order Done</h2>
                    <Button
                        onClick={() => {
                            clearCart();
                            navigate("/");
                        }}
                        value="To the main page"
                    ></Button>
                </div>
            ) : (
                <React.Fragment>
                    <div className="cart--items--container">
                        {cartList.length > 0 ? (
                            <React.Fragment>
                                <h2>Your Order</h2>
                                <h3>Total price {price}$</h3>
                                {orderPizzaElements}
                            </React.Fragment>
                        ) : (
                            <h2>Your Cart is empty</h2>
                        )}
                    </div>
                    <div className="cart--form--container">
                        <h2>Order Form</h2>
                        <OrderFrom onOrderDone={orderDoneHandler} />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Cart;
