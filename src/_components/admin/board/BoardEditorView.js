'use client'

import React, {useEffect, useState} from 'react';
import {useForm, useWatch} from "react-hook-form";
import {Button, Grid, Stack} from "@mui/material";
import CustomInput from "@/components/admin/common/form/CustomInput";
import CustomSelect from "@/components/admin/common/form/CustomSelect";
import dynamic from "next/dynamic";
import Loader from "@/components/common/loader/Loader";
import {useRouter, useSearchParams} from 'next/navigation'
import {useModalStore} from "../../../_store/useModalStore";
import {useAddBoard, useDeleteBoard, useEditBoard, useBoardQuery} from "@/hook/admin/useBoardQuery";
import dayjs from "dayjs";
import parse from "html-react-parser";
import {useQueryClient} from "@tanstack/react-query";
// import {useAddBoard, useBoardQuery, useDeleteBoard, useEditBoard} from "@/hook/admin/useBoardQuery";


const Editor = dynamic(
    () => {
        return import("@/components/common/Editor");
    },
    {ssr: false, loading: () => <Loader/>}
);

const typeList = [
    {label: "LIST", value: "LIST"},
    {label: "THUMB", value: "THUMB"},
    {label: "FAQ", value: "FAQ"},
]

const BoardEditorView = ({boardEnName}) => {

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
            boardKrName: '',
            boardDesc: '',
            type: '',
            pageSize: 0,
            subField01: '',
            subField02: '',
        }
    });

    const router = useRouter();
    const {onConfirm, onAlert} = useModalStore()
    const [type, setType] = useState({type: boardEnName ? "edit" : 'write', btnText: boardEnName ? "수정" : '추가'})

    const queryClient = useQueryClient()
    const {data, isError, isLoading, isSuccess} = useBoardQuery(boardEnName)
    const addBoard = useAddBoard()
    const editBoard = useEditBoard()
    const deleteBoard = useDeleteBoard()

    useEffect(() => {
        if (data && isSuccess) {
            const board = data.data
            reset({...board})
        }else if(isError){
            onAlert({message:`데이터가 없습니다`,callback:() =>router.back()})
        }
    }, [data,isSuccess,isError]);


    const confirmSubmit = (data) => {
        const action = type.type === 'edit' ? onEdit : onAdd

        const formData = {
            ...data,
        }

        onConfirm({message: `${type.btnText}하시겠습니까?`, btnText: type.btnText, callback: () =>{action(formData)}})
    }

    const onAdd = (data) => {
        addBoard.mutate(data,{
            onSuccess: () => {
                invalidate()
                onAlert({message:`추가가 완료되었습니다`,callback:() =>router.back()})
            },
            onError: (error) => {
                onAlert({message:'입력값을 확인해주세요'})
            }
        })
    }

    const onEdit = (data) => {
        editBoard.mutate(data,{
            onSuccess: () => {
                invalidate()
                onAlert({message:`수정이 완료되었습니다`,callback:() =>router.back()})
            },
            onError: (error) => {
                onAlert({message:'입력값을 확인해주세요'})
            }
        })
    }

    const confirmDelete = () => {
        onConfirm({message: `삭제하시겠습니까?`, btnText: '삭제', callback: onDelete})
    }

    const onDelete = () => {
        deleteBoard.mutate(boardEnName,{
            onSuccess: () => {
                invalidate()
                onAlert({message:`삭제가 완료되었습니다`,callback:() =>router.back()})
            },
            onError: (error) => {
                onAlert({message:'에러가 발생했습니다'})
            }
        })
    }

    const invalidate = () =>{
        queryClient.invalidateQueries({ queryKey: ['admin_board_list'] })
        queryClient.invalidateQueries({ queryKey: ['admin_board',boardEnName] })
    }

    return (
        <form onSubmit={handleSubmit(confirmSubmit)}>
            <Grid container xs={12} sx={{'& .MuiTextField-root': {m: 1},}} spacing={1}>
                <Grid item xs={12}>
                    <CustomInput sx={{width: 865}} control={control} name="boardKrName" label="게시판 이름" helperText="게시판이름을 입력해주세요"
                                 rules={{
                                     required: '게시판이름을 입력해주세요'
                                 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomInput sx={{width: 865}} control={control} name="boardDesc" label="게시판 설명" helperText="게시판설명을 입력해주세요"
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomSelect control={control} name={"type"} size={"small"} label={"게시판 유형"}
                                  list={typeList}
                                  variant={"standard"}
                                  helperText="유형"
                                  sx={{width: 205}}/>
                    <CustomInput type={"number"} sx={{width: 205}} control={control} name="pageSize" label="페이지 사이즈"
                                 helperText="페이지당 출력 수"/>
                </Grid>
                <Grid item xs={12}>
                    <CustomInput sx={{width: 205}} control={control} name="subField01" label="추가 필드1"
                                 helperText="추가 필드1"/>
                    <CustomInput sx={{width: 205}} control={control} name="subField02" label="추가 필드2"
                                 helperText="추가 필드2"/>
                </Grid>
                <Grid item xs={12} sx={{ml: 1, mt: 5}}>
                    <Stack spacing={2} direction="row">
                        <Button type={"submit"} variant="contained">{type.btnText}</Button>
                        <Button type={"button"} variant="contained" color="warning" onClick={() =>{router.back()}}>뒤로가기</Button>
                        {type.type == 'edit' && <Button type={"button"} variant="contained" color={"error"} onClick={confirmDelete}>삭제</Button>}
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default BoardEditorView;
