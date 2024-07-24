'use client'
import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './Layout.module.css';
import Navigation from "@/components/admin/laylout/Navigation";
import {useBoardListQuery} from "@/hook/admin/useBoardQuery";
import {useInitDataQuery} from "@/hook/admin/useInitQuery";
import {useEffect} from "react";
import {useAuthStore} from "@/store/useAuthStore";
import {useAdminInitStore} from "@/store/useAdminInitStore";
import HomeIcon from '@mui/icons-material/Home';
import {Menu, MenuItem} from "@mui/material";

const drawerWidth = 240;

export default function Layout({children}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const adminInitStore = useAdminInitStore();
    const {data, isError, isLoading, isSuccess} = useInitDataQuery()

    useEffect(() => {
        if (isSuccess) {
            adminInitStore.setData(data.data)
        }
    }, [data]);

    return (
        <Box className={styles.container}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={`${styles.appBar} ${open ? styles.appBarShift : ''}`}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            href={"/"}
                            edge="start"
                        >
                            <HomeIcon/>
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
            <Drawer
                className={styles.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: styles.drawerPaper,
                }}
            >
                <div className={styles.drawerHeader}>
                    LOGO
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <Navigation/>
            </Drawer>
            <main className={`${styles.content} ${open ? styles.contentShift : ''}`}>
                {children}
            </main>
        </Box>
    );
}
