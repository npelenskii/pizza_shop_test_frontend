import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = (props) => {
    const content = (
        <div className="back-modal-conteiner">
            <div className="modal-conteiner">
                <h2>{props.text}</h2>
                <button onClick={props.ClearError}>Okey</button>
            </div>
        </div>
    );
    return ReactDOM.createPortal(
        content,
        document.getElementById("modal-hook")
    );
};

export default Modal;
