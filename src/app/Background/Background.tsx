import React from "react";
import style from "./background.module.css";
const Background = () => {
    return (
        <div className={`area ${style.area}`}>
            <ul className={`circles ${style.circles}`}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};

export default Background;
