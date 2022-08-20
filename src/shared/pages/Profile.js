import React, { useContext } from "react";
import { TailSpin } from "react-loader-spinner";

import AuthContext from "../context/AuthCotext";
import MainContext from "../context/MainContext";

import OrderCard from "../components/OrderCard";

import "./Profile.css";

const Profile = () => {
    const { isLoading } = useContext(MainContext);
    const { logoutUser } = useContext(AuthContext);
    const { clearCart, orderList, clearOrders } = useContext(MainContext);

    const orderElements = orderList.map((orderItem) => (
        <OrderCard key={orderItem.id} {...orderItem} />
    ));

    return (
        <div className="profile--container">
            {isLoading ? (
                <TailSpin
                    height="100"
                    width="100"
                    color="black"
                    ariaLabel="loading"
                />
            ) : (
                <React.Fragment>
                    {orderElements.length > 0 ? (
                        <React.Fragment>
                            <h2>Your Orders</h2>
                            <div className="profile--order--container">
                                {orderElements}
                            </div>
                        </React.Fragment>
                    ) : (
                        <h2>You have 0 orders</h2>
                    )}
                </React.Fragment>
            )}

            <button
                onClick={() => {
                    logoutUser();
                    clearCart();
                    clearOrders();
                }}
                className="form--button"
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;
