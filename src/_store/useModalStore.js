import {create} from "zustand";

export const useModalStore = create((set) => ({
    alertOpen: false,
    confirmOpen: false,
    alertMessage: '',
    confirmMessage: '',
    confirmBtn:'',
    onAlert: ({message = "", callback}) => set(state => ({
        alertOpen: true,
        alertMessage: message,
        onAlertCallback: callback
    })),
    onCloseAlert: () => set({alertOpen: false}),
    onConfirm: ({message = "", btnText = "확인", callback}) => set(state => ({
        confirmOpen: true,
        confirmMessage: message,
        confirmBtn: btnText,
        onConfirmCallback: callback
    })),
    onCloseConfirm: () => set({confirmOpen: false}),
}));
