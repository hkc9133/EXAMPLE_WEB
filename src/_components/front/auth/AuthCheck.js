'use client'
import React, {useEffect} from 'react';
import {useAuthStore} from "../../../_store/useAuthStore";
import {useRouter} from "next/navigation";

const AuthCheck = (data) => {
    const router = useRouter()
    const {saveUser} = useAuthStore();

    useEffect(() => {
        saveUser(data)
        router.push("/")
    }, []);
    return (
        <div>

        </div>
    );
};

export default AuthCheck;
