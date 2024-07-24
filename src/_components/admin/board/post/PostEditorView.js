'use client'

import React, {useEffect, useState} from 'react';
import {useForm, useWatch} from "react-hook-form";
import {Button, Grid, Stack} from "@mui/material";
import CustomInput from "@/components/admin/common/form/CustomInput";
import CustomSelect from "@/components/admin/common/form/CustomSelect";
import dynamic from "next/dynamic";
import Loader from "@/components/common/loader/Loader";
import {useRouter, useSearchParams} from 'next/navigation'
import {useAddBoard, useDeleteBoard, useEditBoard, useBoardQuery} from "@/hook/admin/useBoardQuery";
import {useQueryClient} from "@tanstack/react-query";
import {useModalStore} from "@/store/useModalStore";
import {useAddPost, useDeletePost, useEditPost, usePostQuery} from "@/hook/admin/usePostQuery";
import parse from "html-react-parser";
import dayjs from "dayjs";
import {useCategoryItemListQuery, useCategoryListQuery} from "@/hook/admin/useCategoryQuery";
import FileUploadInput from "@/components/admin/common/form/file/FileUploadInput";


const Editor = dynamic(
    () => {
        return import("@/components/common/Editor");
    },
    {ssr: false, loading: () => <Loader/>}
);

const ynList = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"}
]

const PostEditorView = ({postId,boardEnName}) => {

    const {
        register,
        getValues,
        setError,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            boardEnName: boardEnName,
            postId: null,
            title: '',
            content: '',
            categoryItemId: '',
            noticeYn: 'N',
            subValue01: '',
            subValue02: '',
            fileList: [],
            newFileList: [],
            deleteFileList: [],
            thumbFileList: [],
            newThumbFileList: [],
            deleteThumbFileList: [],
        }
    });

    const router = useRouter();
    const {onConfirm, onAlert} = useModalStore()
    const [type, setType] = useState({type: postId ? "EDIT" : 'WRITE', btnText: postId ? "수정" : '추가'})

    const queryClient = useQueryClient()
    const {data, isError, isLoading, isSuccess} = usePostQuery(postId)
    const {
        data: boardData,
        isError: boardIsError,
        isLoading: boardIsLoading,
        isSuccess: boardIsSuccess
    } = useBoardQuery(boardEnName)
    const {
        data: categoryData,
        isError: categoryIsError,
        isLoading: categoryIsLoading,
        isSuccess: categoryIsSuccess
    } = useCategoryItemListQuery((boardIsSuccess && boardData?.data?.categoryId) ? {parentId: boardData.data.categoryId} : null)

    const addPost = useAddPost()
    const editPost = useEditPost()
    const deletePost = useDeletePost()


    const [isEditorLoading, setIsEditorLoading] = useState(false);

    useEffect(() => {
        if (data && isSuccess) {
            const post = data.data.post
            reset({
                boardEnName: post.boardEnName,
                postId: post.postId,
                title: post.title,
                content: parse(post.content),
                categoryItemId: post.categoryItemId,
                noticeYn: post.noticeYn,
                subValue01: post.subValue01,
                subValue02: post.subValue02,
                fileList: post.fileList,
                thumbFileList: post.thumbFileList,
            })
        } else if (isError) {
            onAlert({message: `에러가 발생했습니다`, callback: () => router.back()})
        }
    }, [data, isSuccess, isError,isEditorLoading]);


    const confirmSubmit = (data) => {
        const action = type.type === 'EDIT' ? onEdit : onAdd

        const formData = {
            ...data,
        }

        onConfirm({
            message: `${type.btnText}하시겠습니까?`, btnText: type.btnText, callback: () => {
                action(formData)
            }
        })
    }

    const onAdd = (data) => {
        addPost.mutate(data, {
            onSuccess: () => {
                invalidate()
                onAlert({message: `추가가 완료되었습니다`, callback: () => router.back()})
            },
            onError: (error) => {
                onAlert({message: '입력값을 확인해주세요'})
            }
        })
    }

    const onEdit = (data) => {
        editPost.mutate(data, {
            onSuccess: () => {
                invalidate()
                onAlert({message: `수정이 완료되었습니다`, callback: () => router.back()})
            },
            onError: (error) => {
                onAlert({message: '입력값을 확인해주세요'})
            }
        })
    }

    const confirmDelete = () => {
        onConfirm({message: `삭제하시겠습니까?`, btnText: '삭제', callback: onDelete})
    }

    const onDelete = () => {
        deletePost.mutate([postId], {
            onSuccess: async () => {
                await queryClient.invalidateQueries({queryKey: ['admin_post_list', "", boardEnName]})
                onAlert({message: `삭제가 완료되었습니다`, callback: () => router.back()})
            },
            onError: (error) => {
                onAlert({message: '에러가 발생했습니다'})
            }
        })
    }

    const invalidate = async () => {
        await queryClient.invalidateQueries({queryKey: ['admin_post_list', "",boardEnName]})
        await queryClient.invalidateQueries({queryKey: ['admin_post', postId]})
    }

    return (
        <form onSubmit={handleSubmit(confirmSubmit)}>
            <Grid container xs={12} sx={{'& .MuiTextField-root': {m: 1, maxWidth: 865},}} spacing={1}>
                <Grid item xs={12}>
                    <CustomInput sx={{width: '100%'}} control={control} name="title" label="제목" helperText="제목을 입력해주세요"
                                 rules={{
                                     required: '제목을 입력해주세요'
                                 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomSelect control={control} name={"noticeYn"} size={"small"} label={"공지 여부"}
                                  list={ynList}
                                  variant={"standard"}
                                  helperText="목록의 상단 고정"
                                  nullAllow={false}
                                  sx={{width: 205}}/>
                    <CustomSelect control={control} name={"categoryItemId"} size={"small"} label={"카테고리"}
                                  list={categoryIsSuccess ? categoryData.data.map((category) => {
                                      return {label: category.categoryName, value: category.categoryId}
                                  }) : []}
                                  variant={"standard"}
                                  sx={{width: 205}}/>
                </Grid>
                {boardIsSuccess && (
                    <>
                        {boardData.data.subField01 && (
                            <Grid item xs={12}>
                                <CustomInput sx={{width: '100%'}} control={control} name="subValue01" label={boardData.data.subField01}
                                             helperText={boardData.data.subField01}/>
                            </Grid>
                        )}
                        {boardData.data.subField02 && (
                            <Grid item xs={12}>
                                <CustomInput sx={{width: '100%'}} control={control} name="subValue02" label={boardData.data.subField01}
                                             helperText={boardData.data.subField02}/>
                            </Grid>
                        )}
                    </>
                )}
                <Grid item xs={12} sx={{ml: 1, mt: 1}}>
                    <FileUploadInput control={control} width={868} txt={"썸네일"} maxCnt={1} accept={"image/*"} name="newThumbFileList" oldListName={"thumbFileList"} deleteListName={"deleteThumbFileList"}/>
                </Grid>
                <Grid item xs={12} sx={{ml: 1, mt: 1}}>
                    <FileUploadInput control={control} width={868} txt={"첨부파일"} maxCnt={2} name="newFileList" oldListName={"fileList"} deleteListName={"deleteFileList"}/>
                </Grid>
                <Grid item xs={6} sx={{ml: 1, mt: 1}}>
                    {(type.type == "WRITE" || (type.type == "EDIT" && isSuccess)) && (
                        <Editor data={getValues("content")} onChange={(e) => {
                            setValue("content", e)
                        }} position={"left"}/>
                    )}
                </Grid>
                <Grid item xs={12} sx={{ml: 1, mt: 5}}>
                    <Stack spacing={2} direction="row">
                        <Button type={"submit"} variant="contained">{type.btnText}</Button>
                        <Button type={"button"} variant="contained" color="warning" onClick={() => {
                            router.back()
                        }}>뒤로가기</Button>
                        {type.type == 'EDIT' && <Button type={"button"} variant="contained" color={"error"}
                                                        onClick={confirmDelete}>삭제</Button>}
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default PostEditorView;
