'use client'

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDeleteBanner, useBannerListQuery} from "@/hook/admin/useBannerQuery";
import {useModalStore} from "@/store/useModalStore";
import BannerSearch from "@/components/admin/banner/BannerSearch";
import BannerListViewButtonGroup from "@/components/admin/banner/BannerListViewButtonGroup";
import BannerList from "@/components/admin/banner/BannerList";
import {useQueryClient} from "@tanstack/react-query";

const BannerListView = () => {
    const searchParams = useSearchParams();
    const {onConfirm, onAlert} = useModalStore()
    const [columns, setColumns] = useState([
        {id: 'thumb', label: "썸네일", minWidth: 150},
        {id: 'title', label: '제목', minWidth: 200},
        {id: 'url', label: 'URL', minWidth: 100,},
        {id: 'useYn', label: '사용 여부', minWidth: 100,},
        {id: 'regDate', label: '생성일', minWidth: 150,},
    ])
    const [selected, setSelected] = React.useState([]);

    const queryClient = useQueryClient()
    const {data, isError, isLoading, isSuccess} = useBannerListQuery(searchParams.toString())
    const deleteBanner = useDeleteBanner()

    const confirmDelete = () => {
        onConfirm({message: '삭제하시겠습니까?', callback: onDelete})

    }

    const onDelete = () => {
        deleteBanner.mutate(selected, {
            onSuccess: async () => {
                setSelected([])
                await queryClient.invalidateQueries({queryKey: ['admin_banner_list', ""]})
                onAlert({message: `삭제가 완료되었습니다`})
            },
            onError: (error) => {
                onAlert({message: '에러가 발생했습니다'})
            }
        })
    }

    return (
        <>
            <BannerSearch/>
            <BannerListViewButtonGroup confirmDelete={confirmDelete} selected={selected}/>
            <BannerList
                banner={data?.data} isLoading={isLoading} isSuccess={isSuccess}
                selected={selected} setSelected={setSelected} columns={columns}/>
        </>
    );
};

export default BannerListView;
