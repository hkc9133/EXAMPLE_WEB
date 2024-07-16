'use client'
import React, {useEffect} from 'react';
import authService from "@/service/auth";
import Link from "next/link";
import {useAuthStore} from "../../../_store/useAuthStore";
import {useStore} from "../../../_store/useState";
import {useModalStore} from "../../../_store/useModalStore";
import {useLogout} from "@/hook/auth/useAuthMutations";
import {useRouter} from "next/navigation";

const RoleCheck = () => {
    const router = useRouter()
    const isLogin = useStore(useAuthStore, (state) => {
        return state.isLogin;
    });
    const {onConfirm, onAlert} = useModalStore()
    const logoutMutation = useLogout();


    const handleTTTCheck = () =>{
        authService.tttCheck().then((res) =>{
            console.log(res)
        })
    }

    const handleTTTCheck22 = () =>{
        authService.tttCheck2().then((res) =>{
            console.log("ffffffffffff")
            console.log(res)
        }).catch((err) =>{
            console.log(err)
        })
    }

    const handleTTTCheck3 = () =>{
        authService.tttCheck3().then((res) =>{
            console.log("ffffffffffff")
            console.log(res)
        }).catch((err) =>{
            console.log(err)
        })
    }

    const handleRefresh = () =>{
        authService.refresh()
    }

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

    useEffect(() => {
        // onAlert({message:'2323'})
        onConfirm({message:'2323'})
    }, []);

    return (
        <div>
            <button type={"button"} onClick={handleTTTCheck}>ttt Check</button>
            <button type={"button"} onClick={handleTTTCheck22}>ttt2 Check</button>
            <button type={"button"} onClick={handleTTTCheck3}>ttt3 Check</button>
            <button type={"button"} onClick={handleRefresh}>refresh</button>
            <br/>
            <Link href={"/admin"}>admin</Link>
            <Link href={"/private"}>aaaaaaaaaaaaaaaaaa</Link>
            <br/>
            <br/>
            {isLogin ?  <button onClick={handleLogout}>logout</button> : <Link href={"/auth/login"}>login</Link>}

        </div>
    );
};

export default RoleCheck;
