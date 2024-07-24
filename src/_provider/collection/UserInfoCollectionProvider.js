'use client'
import React, {useEffect} from 'react';
import { usePathname, useSearchParams } from 'next/navigation'
import { browserName,isMobile,isDesktop,osName } from 'react-device-detect';
import statsService from "@/service/user/stats";



const UserInfoCollectionProvider = ({children}) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    useEffect(() => {

        console.log(pathname, searchParams.toString(),browserName,isMobile)

        const data ={
            url:pathname,
            param:searchParams.toString(),
            browser:browserName,
            isDesktop:isDesktop,
            isMobile:isMobile,
            osName:osName
        }

        console.log(data)
        statsService.addPageViewStats(data)
    }, [pathname, searchParams])
    return (
        <>
            {children}
        </>
    );
};

export default UserInfoCollectionProvider;
