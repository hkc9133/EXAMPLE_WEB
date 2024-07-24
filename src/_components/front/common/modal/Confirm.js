'use client'
import React from 'react';
import {useModalStore} from "@/store/useModalStore";
import style from "@/components/front/common/modal/modal.module.scss";

const Confirm = () => {
    const {confirmOpen, confirmMessage, confirmBtn, onCloseConfirm, onConfirmCallback} = useModalStore();

    if (!confirmOpen) return null;

    const handleConfirm = () => {
        onConfirmCallback();
        onCloseConfirm();
    };

    return (
        <div className={style.modal}>
            <div className={style.content}>
                <p className={style.msg}>{confirmMessage}</p>
                <div className={style.btn_area}>
                    <button type={"button"} className={style.btn_ok} onClick={handleConfirm}>{confirmBtn}</button>
                    <button type={"button"} onClick={onCloseConfirm}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
