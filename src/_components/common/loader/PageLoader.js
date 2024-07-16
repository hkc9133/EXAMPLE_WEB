"use client";
import React, { useEffect } from "react";
import style from "./Loader.module.scss";

const PageLoader = () => {
    return (
        <>
            <div className={style.page_wrap}>
                <div className={style.spinner}></div>
            </div>
        </>
    );
};

export default PageLoader;
