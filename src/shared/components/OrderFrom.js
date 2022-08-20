import { useLoadScript } from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import Button from "../components/Button";
import Input from "../components/Input";
import Map from "../components/Map";
import { useHttpClient } from "../hooks/http-hook";
import Modal from "./Modal";

import AuthContext from "../context/AuthCotext";
import MainContext from "../context/MainContext";
import "./OrderForm.css";

const OrderFrom = (props) => {
    const { makeOrder } = useContext(MainContext);
    const { user } = useContext(AuthContext);

    const { sendRequest, error, clearError } = useHttpClient();

    const [inputs, setInputs] = useState([
        {
            name: "name",
            value: user?.firstName || "",
            isValid: user?.firstName ? true : false,
        },
        {
            name: "phone",
            value: "",
            isValid: false,
        },
        {
            name: "email",
            value: user?.email || "",
            isValid: user?.email ? true : false,
        },
        {
            name: "address",
            value: "",
            isValid: false,
        },
    ]);
    const [disabled, setDisabled] = useState(true);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        setReset(false);
    }, [reset]);

    useEffect(() => {
        setDisabled(() => {
            let value = false;
            inputs.forEach((input) => {
                if (input.isValid === false) {
                    value = true;
                }
            });
            return value;
        });
    }, [inputs]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
    });

    const handleInputChange = (input) => {
        setInputs((prevInputs) =>
            prevInputs.map((item) => {
                if (item.name === input.name) {
                    item = {
                        ...item,
                        value: input.value,
                        isValid: input.isValid,
                    };
                }
                return item;
            })
        );
    };

    const handleClickOnMap = async (coordinates) => {
        let responseData;
        try {
            responseData = await sendRequest(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&language=en&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
            );
        } catch (err) {}
        if (responseData.status !== "ZERO_RESULTS") {
            setInputs((prevInputs) =>
                prevInputs.map((item) => {
                    if (item.name === "address") {
                        item = {
                            ...item,
                            value: responseData.results[0].formatted_address,
                            isValid: true,
                        };
                    }
                    return item;
                })
            );
        } else {
            setInputs((prevInputs) =>
                prevInputs.map((item) => {
                    if (item.name === "address") {
                        item = {
                            ...item,
                            value: responseData.plus_code.compound_code,
                            isValid: true,
                        };
                    }
                    return item;
                })
            );
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!disabled) {
            try {
                makeOrder(e);
                props.onOrderDone();
            } catch (error) {}
        }
    };

    return (
        <React.Fragment>
            {error && <Modal text={error} ClearError={clearError} />}
            <form className="login--form" onSubmit={handleFormSubmit}>
                <Input
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    value={inputs[0].value}
                    send={handleInputChange}
                    reset={reset}
                />
                <Input
                    placeholder="Enter your phone number"
                    id="phone"
                    value={inputs[1].value}
                    send={handleInputChange}
                    reset={reset}
                />
                <Input
                    placeholder="Enter your email"
                    id="email"
                    value={inputs[2].value}
                    send={handleInputChange}
                    reset={reset}
                />
                <Input
                    placeholder="Enter your address"
                    id="address"
                    value={inputs[3].value}
                    send={handleInputChange}
                    reset={reset}
                />
                {!isLoaded ? (
                    <TailSpin
                        height="100"
                        width="100"
                        color="black"
                        ariaLabel="loading"
                    />
                ) : (
                    <Map mapClick={handleClickOnMap} />
                )}
                <Button
                    type="submit"
                    value="Submit order"
                    disabled={disabled}
                />
            </form>
        </React.Fragment>
    );
};

export default OrderFrom;
