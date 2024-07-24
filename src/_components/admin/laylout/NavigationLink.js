import React, {useEffect, useState} from 'react';
import NextLink from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListItemText from "@mui/material/ListItemText";
import {usePathname, useRouter} from "next/navigation";

const NavigationLink = ({item,isSuv}) => {
    const router = useRouter();
    const pathname = usePathname()
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        // console.log(pathname)
        setIsActive(pathname === item.path || pathname === item.path+"/write")
        // handleURLQueries(router,item.path)
    }, [pathname]);

    const handleURLQueries = (router, path) => {
        if (Object.keys(router.query).length && path) {
            const arr = Object.keys(router.query)

            return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]]) && path !== '/'
        }

        return false
    }
    return (
        <>
            <ListItemButton component={NextLink} href={item.path} selected={isActive}
                            sx={{
                                'pl':isSuv && 4,
                                // '&:hover': {
                                //     backgroundColor: 'rgba(220, 0, 50, 0.1)'
                                // },
                                '&.Mui-selected': {
                                    color:'#fff',
                                    backgroundColor: '#1976d2'
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#1976d2'
                                }
                            }}
            >
                <ListItemIcon>
                    <item.icon/>
                </ListItemIcon>
                <ListItemText primary={item.title}/>
            </ListItemButton>
        </>
    );
};

export default NavigationLink;
