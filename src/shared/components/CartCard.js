import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import MainContext from "../context/MainContext";
import "./CartCard.css";

const CartCard = (props) => {
    const { removeFromCart } = useContext(MainContext);
    return (
        <div className="cart--card--container">
            <img src={props.pizza_image.thumbnail} alt={props.name} />
            <h4>{props.name}</h4>
            <h3>{props.size}</h3>
            <h3>{props[`price_${props.size.toLowerCase()}`]}$</h3>
            <div className="cart--card--remove--container">
                <FontAwesomeIcon
                    icon={faX}
                    onClick={() => removeFromCart(props.cartId)}
                    className="cart--item--remove--icon"
                />
            </div>
        </div>
    );
};

export default CartCard;
