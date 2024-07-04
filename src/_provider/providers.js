'use client'
import React from 'react';
import ReactQueryProvider from "@/provider/react-query/ReactQueryProvider";
import {SessionProvider} from "next-auth/react";

const Providers = ({children}) => {
    return (
        <>
            <SessionProvider>
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </SessionProvider>
        </>
    );
};

export default Providers;
