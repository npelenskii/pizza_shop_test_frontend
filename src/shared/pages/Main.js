import React, { useContext } from "react";
import { TailSpin } from "react-loader-spinner";

import CreationSection from "../components/CreationSection";
import Menu from "../components/Menu";
import MainContext from "../context/MainContext";

import "./Main.css";

const Main = () => {
    const { isLoading } = useContext(MainContext);
    return (
        <div className="main--container">
            <CreationSection />
            <Menu />
            {isLoading && (
                <TailSpin
                    height="100"
                    width="100"
                    color="black"
                    ariaLabel="loading"
                />
            )}
        </div>
    );
};

export default Main;
