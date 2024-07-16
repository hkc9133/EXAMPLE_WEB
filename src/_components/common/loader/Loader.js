"use client";

import React from "react";
import style from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={style.spinner_wrap}>
            <div className={style.spinner} />
        </div>
    );
};

export default Loader;
