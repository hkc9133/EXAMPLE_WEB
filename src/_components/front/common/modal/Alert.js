'use client'
import React from 'react';
import {useModalStore} from "../../../../_store/useModalStore";
import style from "./modal.module.scss";

const Alert = () => {
    const {alertOpen, alertMessage,alertBtn, onCloseAlert, onAlertCallback} = useModalStore();

    if (!alertOpen) return null;

    const handleClick = () =>{

        onCloseAlert()

        if(onAlertCallback){
            onAlertCallback()
        }

    }

    return (
        <div className={style.modal}>
            <div className={style.content}>
                <p className={style.msg}>{alertMessage}</p>
                <div className={style.btn_area}>
                    <button className="close" onClick={handleClick}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
