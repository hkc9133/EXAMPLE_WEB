import React, {useEffect, useState} from 'react';
import NextLink from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import {usePathname, useRouter} from "next/navigation";
import NavigationLink from "@/components/admin/laylout/NavigationLink";

const NavigationItem = ({item}) => {
    const router = useRouter();
    const pathname= usePathname()
    const [isActive, setIsActive] = useState(false)
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    useEffect(() => {

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
            {item.children.length == 0 ?
                <NavigationLink item={item}/>
                :
                <>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={item.title}/>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        {
                            item.children.map((subNavi) =>(
                                <NavigationLink key={`${subNavi.path}`} item={subNavi} isSuv={true}/>
                            ))
                        }
                        </List>
                    </Collapse>
                </>
            }
        </>
    );
};

export default NavigationItem;
