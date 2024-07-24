'use client'

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDeletePost, usePostListQuery} from "@/hook/admin/usePostQuery";
import {useBoardQuery} from "@/hook/admin/useBoardQuery";
import {useModalStore} from "@/store/useModalStore";
import PostSearch from "@/components/admin/board/post/PostSearch";
import PostListViewButtonGroup from "@/components/admin/board/post/PostListViewButtonGroup";
import PostList from "@/components/admin/board/post/PostList";
import qs from "query-string";
import {useQueryClient} from "@tanstack/react-query";

const PostListView = ({boardEnName,}) => {
    const searchParams = useSearchParams();
    const {replace, push} = useRouter();
    const {onConfirm, onAlert} = useModalStore()
    const [columns, setColumns] = useState([
        {id: 'title', label: '제목', minWidth: 300},
        {id: 'category', label: '카테고리', minWidth: 100,},
        {id: 'viewCnt', label: '조회수', minWidth: 100,},
        {id: 'regDate', label: '작성일', minWidth: 150,},
    ])
    const [selected, setSelected] = React.useState([]);

    const queryClient = useQueryClient()
    const {
        data: boardData,
        isError: boardIsError,
        isLoading: boardIsLoading,
        isSuccess: boardIsSuccess
    } = useBoardQuery(boardEnName)
    const {data, isError, isLoading, isSuccess} = usePostListQuery(searchParams.toString(), boardEnName)
    const deletePost = useDeletePost()

    useEffect(() => {
        if (boardIsSuccess) {
            if (!boardData.data) {
                onAlert({
                    message: "잘못된 접근입니다", callback: () => {
                        push("/admin/board")
                    }
                })
            } else {
                if (boardData.data.thumbYn == "Y") {
                    setColumns((prev) => {
                        return [{id: 'thumb', label: "썸네일", minWidth: 150}, ...prev]
                    })
                }
            }

        }
    }, [boardData, boardIsSuccess]);

    const confirmDelete = () => {
        onConfirm({message:'삭제하시겠습니까?',callback:onDelete})

    }

    const onDelete = () => {

        console.log(selected)
        const queryString = qs.stringify({idList: selected}, {arrayFormat: 'comma'});
        console.log(queryString)
        deletePost.mutate(selected, {
            onSuccess: async () => {
                setSelected([])
                await queryClient.invalidateQueries({queryKey: ['admin_post_list', "", boardEnName]})
                onAlert({message: `삭제가 완료되었습니다`})
            },
            onError: (error) => {
                onAlert({message: '에러가 발생했습니다'})
            }
        })
    }

    return (
        <>
            <PostSearch/>
            <PostListViewButtonGroup confirmDelete={confirmDelete} selected={selected}/>
            <PostList boardEnName={boardEnName}
                      post={data?.data?.post} noticeCnt={data?.data?.noticeCnt} isLoading={isLoading} isSuccess={isSuccess}
                      thumbYn={boardData?.data?.thumbYn}
                      selected={selected} setSelected={setSelected} columns={columns}/>
        </>
    );
};

export default PostListView;
