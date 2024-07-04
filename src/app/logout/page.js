'use client'
import React, {useEffect} from 'react';
import {signOut} from "next-auth/react";

const Page = () => {
    useEffect(() => {
        signOut({
            callbackUrl: `/auth/login`,
        });
    }, []);
    return (
        <div>

        </div>
    );
};

export default Page;
