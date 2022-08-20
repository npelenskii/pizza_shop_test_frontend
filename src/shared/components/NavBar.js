import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthCotext";
import MainContext from "../context/MainContext";

import "./NavBar.css";

const NavBar = () => {
    const { user } = useContext(AuthContext);

    const { countCart } = useContext(MainContext);

    return (
        <nav className="navbar--container">
            <Link className="navbar--heading" to="/">
                SANTORINIS
            </Link>
            {user?.user_id ? (
                <Link className="navbar--login" to="/profile">
                    {user.email}
                </Link>
            ) : (
                <Link className="navbar--login" to="/login">
                    Login
                </Link>
            )}

            <Link className="navbar--cart" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                <h3>{countCart}</h3>
            </Link>
        </nav>
    );
};

export default NavBar;
