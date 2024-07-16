import React from 'react';
import axios from "axios";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import AuthCheck from "@/components/front/auth/AuthCheck";

const fetch = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("access").value

    const headers = {
    'Authorization':`Bearer ${token}`
    }
    const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/my/info`, {headers: headers}).then((res) => {
        return {
            result: true,
            data: res.data.data
        };
    }).catch((e) => {
        console.log(e)
        return {
            result: false,
            data: null
        };
    })

    return result;
}
const Page = async () => {
    const res = await fetch()

    if(!res.result){
        redirect("/auth/login")
    }

    return (
        <AuthCheck data={res.data}/>
    );
};

export default Page;

