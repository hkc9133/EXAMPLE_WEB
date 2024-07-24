'use client'
import React, {useEffect} from 'react';
import {useStore} from "@/store/useState";
import {useAuthStore} from "@/store/useAuthStore";
import {useRouter} from "next/navigation";
import PageLoader from "@/components/common/loader/PageLoader";

const AuthProvider = ({children, requireAdmin = false}) => {

    const router = useRouter();
    const isLogin = useStore(useAuthStore, (state) => {
        return state.isLogin;
    });
    const isAdmin = useStore(useAuthStore, (state) => {
        return state.isAdmin;
    });

    useEffect(() => {

        if (isLogin != undefined && isAdmin != undefined) {
            console.log(isLogin, isAdmin)
            if (requireAdmin) {
                if (!isLogin || !isAdmin) {
                    router.push("/")
                }
            } else {
                if (!isLogin) {
                    router.push("/")
                }
            }
        }
    }, [isLogin, isAdmin]);


    if (!isLogin || !isAdmin) {
        return <PageLoader/>;  // 인증 확인 중 로딩 표시
    }


    return <>{children}</>;
};

export default AuthProvider;
