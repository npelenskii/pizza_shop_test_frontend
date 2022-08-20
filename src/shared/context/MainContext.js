import { createContext, useContext, useEffect, useState } from "react";
import shortid from "shortid";

import Modal from "../components/Modal";
import { useHttpClient } from "../hooks/http-hook";
import AuthContext from "./AuthCotext";

const MainContext = createContext();

export default MainContext;

export function MainProvider({ children }) {
    const { user, authTokens } = useContext(AuthContext);
    const { sendRequest, isLoading, error, setError, clearError } =
        useHttpClient();

    const [pizzaList, setPizzaList] = useState([]);
    const [menuPizza, setMenuPizza] = useState([]);
    const [userPizza, setUserPizza] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [countCart, setCountCart] = useState(0);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        updateOrders();
        fetchPizza();
        // eslint-disable-next-line
    }, [user?.user_id]);

    useEffect(() => {
        let menuPizzaList = [],
            userPizzaList = [];
        if (pizzaList) {
            pizzaList.forEach((pizzaItem) => {
                if (pizzaItem.creater === null) {
                    menuPizzaList.push(pizzaItem);
                } else if (pizzaItem.creater === user?.user_id) {
                    userPizzaList.push(pizzaItem);
                }
            });
            setMenuPizza(menuPizzaList);
            setUserPizza(userPizzaList);
        }
    }, [user, pizzaList]);

    useEffect(() => {
        setCountCart(cartList.length);
    }, [cartList]);

    const fetchPizza = async () => {
        let responseData;
        try {
            responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/v1/pizza/`
            );
            setPizzaList(responseData);
        } catch (error) {}
    };

    const updateOrders = async () => {
        if (user?.user_id) {
            let responseData;
            try {
                responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/v1/order/mine/`,
                    "GET",
                    null,
                    {
                        Authorization: "Bearer " + authTokens.access,
                    }
                );
                if (!responseData?.detail) {
                    setOrderList(responseData);
                }
            } catch (error) {}
        }
    };

    const addToCart = (id, size) => {
        const pizzaToAdd = {
            ...pizzaList.find((pizzaItem) => pizzaItem.id === id),
        };
        pizzaToAdd.size = size;
        pizzaToAdd.cartId = shortid.generate();
        setCartList((prevCartList) => [pizzaToAdd, ...prevCartList]);
    };

    const removeFromCart = (id) => {
        setCartList((prevCartList) =>
            prevCartList.filter((pizzaItem) => pizzaItem.cartId !== id)
        );
    };

    const clearCart = () => {
        setCartList([]);
    };

    const createPizza = async (pizzaData, size) => {
        if (user?.user_id) {
            let responseData;
            try {
                responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/v1/pizza/`,
                    "POST",
                    JSON.stringify({ ...pizzaData, creater: user.user_id }),
                    {
                        Authorization: "Bearer " + authTokens.access,
                        "Content-Type": "application/json",
                    }
                );

                const createdPizzatoCart = { ...responseData };

                createdPizzatoCart.size = size;
                createdPizzatoCart.cartId = shortid.generate();

                setCartList((prevCartList) => [
                    createdPizzatoCart,
                    ...prevCartList,
                ]);
                fetchPizza();
            } catch (error) {}
        } else {
            setError("Please login to make custom pizza");
        }
    };

    const makeOrder = async (e) => {
        e.preventDefault();
        if (cartList.length < 1) {
            setError(
                "Your cart is Empty. Please add at least one pizza to your cart"
            );
        } else {
            let pizzaListToOrder = [];
            cartList.forEach((pizzaItem) => {
                pizzaListToOrder.push(`${pizzaItem.id}/${pizzaItem.size}`);
            });
            try {
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/v1/order/`,
                    "POST",
                    JSON.stringify({
                        order_list: pizzaListToOrder,
                        address: e.target.address.value,
                        email: e.target.email.value,
                        phone: e.target.phone.value,
                        customer: user?.user_id ? user.user_id : null,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                updateOrders();
            } catch (error) {}
        }
    };

    const copyOrderToCart = (pizzaList) => {
        pizzaList.forEach((pizzaItem) => {
            addToCart(pizzaItem.pizza.id, pizzaItem.size);
        });
    };

    const clearOrders = () => {
        setOrderList([]);
    };

    return (
        <MainContext.Provider
            value={{
                menuPizza,
                userPizza,
                cartList,
                orderList,
                addToCart,
                removeFromCart,
                clearCart,
                countCart,
                createPizza,
                makeOrder,
                copyOrderToCart,
                clearOrders,
                isLoading,
                error,
            }}
        >
            {error && <Modal text={error} ClearError={clearError} />}
            {children}
        </MainContext.Provider>
    );
}
