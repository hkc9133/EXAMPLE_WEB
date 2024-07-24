'use client'
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useDeletePopup, usePopupListQuery} from "@/hook/admin/usePopupQuery";
import Loader from "@/components/common/loader/Loader";
import dayjs from "dayjs";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import PopupSearch from "@/components/admin/popup/PopupSearch";
import PopupListViewButtonGroup from "@/components/admin/popup/PopupListViewButtonGroup";
import PopupList from "@/components/admin/popup/PopupList";
import {useModalStore} from "@/store/useModalStore";
import {useQueryClient} from "@tanstack/react-query";

const columns = [
    {id: 'title', label: 'title', minWidth: 200},
    {
        id: 'start',
        label: '시작일',
        minWidth: 170,
        format: (value) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
        id: 'end',
        label: '종료일',
        minWidth: 170,
        format: (value) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
        id: 'pcYn',
        label: 'PC',
        minWidth: 50,
        format: (value) => value,
    },
    {
        id: 'mobileYn',
        label: 'Mobile',
        minWidth: 50,
        format: (value) => value,
    },
    {
        id: 'regDate',
        label: '등록일',
        minWidth: 170,
        format: (value) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    },
];

const PopupListView = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const {onConfirm, onAlert} = useModalStore()
    const [selected, setSelected] = React.useState([]);

    const queryClient = useQueryClient()
    const {data, isError, isLoading, isSuccess} = usePopupListQuery(searchParams.toString())
    const deletePopup = useDeletePopup()

    const confirmDelete = () => {
        onConfirm({message: `삭제하시겠습니까?`, btnText: '삭제', callback: onDelete})
    }

    const onDelete = () => {
        deletePopup.mutate(selected,{
            onSuccess: async () => {
                setSelected([])
                await queryClient.invalidateQueries({queryKey: ['admin_popup_list']})
                onAlert({message: `삭제가 완료되었습니다`})
            },
            onError: (error) => {
                onAlert({message:'에러가 발생했습니다'})
            }
        })
    }

    return (
        <>
            <PopupSearch/>
            <PopupListViewButtonGroup selected={selected} confirmDelete={confirmDelete}/>
            <PopupList columns={columns} data={data?.data} isLoading={isLoading} isSuccess={isSuccess} selected={selected}setSelected={setSelected}/>
        </>
    );
};

export default PopupListView;
