'use client'
import React from 'react';
import authService from "@/service/auth";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";

const RoleCheck = () => {

    const session = useSession();

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
        signOut({
            callbackUrl: `/auth/login`,
        });
    }

    return (
        <div>
            <button type={"button"} onClick={handleTTTCheck}>ttt Check</button>
            <button type={"button"} onClick={handleTTTCheck22}>ttt2 Check</button>
            <button type={"button"} onClick={handleTTTCheck3}>ttt3 Check</button>
            <button type={"button"} onClick={handleRefresh}>refresh</button>
            <br/>
            <Link href={"/admin"}>admin</Link>
            <br/>
            <br/>
            {session.status === "authenticated" ?  <button type={"button"} onClick={handleLogout}>logout</button> : <Link href={"/auth/login"}>login</Link>}

        </div>
    );
};

export default RoleCheck;
