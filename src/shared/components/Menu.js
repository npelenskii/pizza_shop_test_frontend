import React, { useContext } from "react";

import MainContext from "../context/MainContext";
import MenuCard from "./MenuCard";

import "./Menu.css";

const Menu = () => {
    const { menuPizza, userPizza } = useContext(MainContext);

    const menuPizzaElements = menuPizza.map((pizzaItem) => {
        return <MenuCard key={pizzaItem.id} {...pizzaItem} />;
    });

    const userPizzaElements = userPizza.map((pizzaItem) => (
        <MenuCard key={pizzaItem.id} {...pizzaItem} />
    ));

    return (
        <div className="menu-main-container">
            {menuPizzaElements.length > 0 && (
                <React.Fragment>
                    <h2>Popular Recipes</h2>
                    <div className="menu-items-container">
                        {menuPizzaElements}
                    </div>
                </React.Fragment>
            )}
            {userPizzaElements.length > 0 && (
                <React.Fragment>
                    <h2>Your Recipes</h2>
                    <div className="menu-items-container">
                        {userPizzaElements}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Menu;
