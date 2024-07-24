import * as React from 'react';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NavigationItem from "@/components/admin/laylout/NavigationItem";
import {useAdminInitStore} from "@/store/useAdminInitStore";
import {useEffect} from "react";
import {useStore} from "@/store/useState";
import ListIcon from '@mui/icons-material/List';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import MoreIcon from '@mui/icons-material/More';
const adminBase = process.env.NEXT_PUBLIC_ADMIN_BASE


const Navigation = () => {

    const initData = useStore(useAdminInitStore, (state) => {
        return state.initData;
    });

    const [menuList, setMenuList] = React.useState([]);

    useEffect(() => {
        if (!initData) {
            return;
        }else{
            const list = [
                {
                    title: '대시보드',
                    id: 'dashboard',
                    icon: DashboardIcon,
                    path: `${adminBase}/dashboard`,
                    children: []
                },
                {
                    title: '사용자',
                    id: 'user',
                    icon: PersonIcon,
                    path: `${adminBase}/user`,
                    children: []
                },
                {
                    title: '게시판',
                    id: 'board',
                    icon: DynamicFeedIcon,
                    children: [
                        {
                            title: '게시판 관리',
                            icon: SettingsIcon,
                            path: `${adminBase}/board`,
                        },
                        ...initData.board.map((board) => (
                            {
                                title: board.boardKrName,
                                icon: ListIcon,
                                path: `${adminBase}/board/${board.boardEnName}`,
                            }
                        )),
                    ]
                },
                {
                    title: '카테고리',
                    id: 'category',
                    icon: CategoryIcon,
                    path: `${adminBase}/category`,
                    children: []
                },
                {
                    title: '기타',
                    id: 'etc',
                    icon: MoreIcon,
                    children: [{
                        title: '팝업',
                        icon: ListIcon,
                        path: `${adminBase}/popup`,
                    },
                        {
                            title: '배너',
                            icon: ListIcon,
                            path: `${adminBase}/banner`,
                        },
                    ]
                },
                {
                    title: '사이트 관리',
                    id: 'site_setting',
                    icon: SettingsIcon,
                    path: `${adminBase}/site_setting`,
                    children: []
                },
            ]
            setMenuList(list)
        }

    }, [initData]);
    return (
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0}}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {menuList.map((navi) => (
                <NavigationItem key={navi.title} item={navi}/>
            ))}
        </List>
    );
};

export default Navigation;
