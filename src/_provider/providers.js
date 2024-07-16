'use client'
import React from 'react';
import ReactQueryProvider from "@/provider/react-query/ReactQueryProvider";
import {CookiesProvider} from "react-cookie";

const Providers = ({children}) => {
    return (
        <>
            <CookiesProvider>
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </CookiesProvider>
        </>
    );
};

export default Providers;
