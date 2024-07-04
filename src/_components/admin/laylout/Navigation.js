import * as React from 'react';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import NavigationItem from "@/components/admin/laylout/NavigationItem";

const adminBase = "/admin"
const naviList = () => {
    return [
        {
            title: 'Dashboard',
            icon: PersonIcon,
            path: `${adminBase}/dashboard`,
            children: []
        },
        {
            title: 'User',
            icon: PersonIcon,
            path: `${adminBase}/user`,
            children: []
        },
        {
            title: 'Board',
            icon: PersonIcon,
            children: [{
                title: 'Notice',
                icon: PersonIcon,
                path: `${adminBase}/board/notice`,
            },
                {
                    title: 'Data',
                    icon: PersonIcon,
                    path: `${adminBase}/board/data`,
                },
            ]
        }
    ]

}

const Navigation = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper',padding:0}}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {/*<ListItemButton component={NextLink} href="/admin/dashboard">*/}
            {/*    <ListItemIcon>*/}
            {/*        <PersonIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="대시보드"/>*/}
            {/*</ListItemButton>*/}
            {/*<ListItemButton component={NextLink} href="/admin/user">*/}
            {/*    <ListItemIcon>*/}
            {/*        <DraftsIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="사용자"/>*/}
            {/*</ListItemButton>*/}
            {/*<ListItemButton onClick={handleClick}>*/}
            {/*    <ListItemIcon>*/}
            {/*        <InboxIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="게시판"/>*/}
            {/*    {open ? <ExpandLess/> : <ExpandMore/>}*/}
            {/*</ListItemButton>*/}
            {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
            {/*    <List component="div" disablePadding>*/}
            {/*        <ListItemButton sx={{pl: 4}} component={NextLink} href="/admin/board/notice">*/}
            {/*            <ListItemIcon>*/}
            {/*                <StarBorder/>*/}
            {/*            </ListItemIcon>*/}
            {/*            <ListItemText primary="공지사항"/>*/}
            {/*        </ListItemButton>*/}
            {/*        <ListItemButton sx={{pl: 4}} component={NextLink} href="/admin/board/notice">*/}
            {/*            <ListItemIcon>*/}
            {/*                <StarBorder/>*/}
            {/*            </ListItemIcon>*/}
            {/*            <ListItemText primary="공지사항2"/>*/}
            {/*        </ListItemButton>*/}
            {/*    </List>*/}
            {/*</Collapse>*/}
            {naviList().map((navi) => (
                <NavigationItem key={navi.title} item={navi}/>
            ))}
        </List>
    );
};

export default Navigation;
