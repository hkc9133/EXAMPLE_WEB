'use client'
import React, {useEffect} from 'react';
import axios from "axios";
import {useRouter} from "next/navigation";
import {useLogin, useLogout} from "@/hook/auth/useAuthMutations";

const Page = () => {
    const router = useRouter();
    const logoutMutation = useLogout();

    const handleLogout = async () => {
        logoutMutation.mutate({},{
            onSuccess:() =>{
                router.push("/")
            },
            onError:() =>{
                router.push("/")
            },
        })
        // loginMutation.mutate(data,{
        //     onSuccess: () => {
        //         router.push("/")
        //     },
        //     onError: (error) => {
        //         onAlert({message:'입력값을 확인해주세요'})
        //     }
        // })

        // await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`, null, {withCredentials: true});
        // logout()
        // router.push("/")

    }

    useEffect(() => {
        handleLogout()
    }, []);
    return (
        <div>

        </div>
    );
};

export default Page;
