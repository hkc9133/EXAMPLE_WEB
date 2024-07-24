'use client'
import React, {useEffect} from 'react';
import authService from "@/service/auth";
import Link from "next/link";
import {useAuthStore} from "@/store/useAuthStore";
import {useStore} from "@/store/useState";
import {useModalStore} from "@/store/useModalStore";
import {useLogout} from "@/hook/auth/useAuthMutations";
import {useRouter} from "next/navigation";

const RoleCheck = () => {
    const router = useRouter()
    const isLogin = useStore(useAuthStore, (state) => {
        return state.isLogin;
    });
    const {onConfirm, onAlert} = useModalStore()
    const logoutMutation = useLogout();

    const handleLogout = () =>{
        logoutMutation.mutate({},{
            onSuccess:() =>{
                router.push("/")
            },
            onError:() =>{
                router.push("/")
            },
        })
    }

    return (
        <div>
            <Link href={"/admin"}>admin</Link>
            <br/>
            <br/>
            {isLogin ?  <button onClick={handleLogout}>logout</button> : <Link href={"/auth/login"}>login</Link>}

        </div>
    );
};

export default RoleCheck;
