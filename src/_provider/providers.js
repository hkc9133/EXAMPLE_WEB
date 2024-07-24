'use client'
import React from 'react';
import ReactQueryProvider from "@/provider/react-query/ReactQueryProvider";
import {CookiesProvider} from "react-cookie";
import UserInfoCollectionProvider from "@/provider/collection/UserInfoCollectionProvider";

const Providers = ({children}) => {
    return (
        <>
            <CookiesProvider>
                <ReactQueryProvider>
                    <UserInfoCollectionProvider>
                        {children}
                    </UserInfoCollectionProvider>
                </ReactQueryProvider>
            </CookiesProvider>
        </>
    );
};

export default Providers;
