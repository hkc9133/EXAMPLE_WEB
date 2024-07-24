'use client'
import React, {useEffect, useState} from 'react';
import {useForm, useWatch} from "react-hook-form";
import {Button, Grid, Stack} from "@mui/material";
import CustomInput from "@/components/admin/common/form/CustomInput";
import FileUploadInput from "@/components/admin/common/form/file/FileUploadInput";
import CustomSelect from "@/components/admin/common/form/CustomSelect";
import CustomDateTimePicker from "@/components/admin/common/form/CustomDateTimePicker";
import dynamic from "next/dynamic";
import Loader from "@/components/common/loader/Loader";
import {useRouter, useSearchParams} from 'next/navigation'
import {useModalStore} from "@/store/useModalStore";
import {useAddPopup, useDeletePopup, useEditPopup, usePopupQuery} from "@/hook/admin/usePopupQuery";
import dayjs from "dayjs";
import parse from "html-react-parser";
import {useQueryClient} from "@tanstack/react-query";


const Editor = dynamic(
    () => {
        return import("@/components/common/Editor");
    },
    {ssr: false, loading: () => <Loader/>}
);

const pcFieldList = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"},
]
const mobileFieldList = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"},
]

const PopupEditorView = ({popupId}) => {

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
            popupId: popupId,
            title: '',
            content: '',
            leftPosition: 0,
            topPosition: 0,
            width: '',
            height: '',
            afterTime: 0,
            pcYn: "Y",
            mobileYn: "Y",
            start:null,
            end:null,
        }
    });

    const startWatch = watch("start")
    const endWatch = watch("end")

    const router = useRouter();
    const {onConfirm, onAlert} = useModalStore()
    const [type, setType] = useState({type: popupId ? "EDIT" : 'WRITE', btnText: popupId ? "수정" : '추가'})

    const queryClient = useQueryClient()
    const {data, isError, isLoading, isSuccess} = usePopupQuery(popupId)
    const addPopup = useAddPopup()
    const editPopup = useEditPopup()
    const deletePopup = useDeletePopup()

    useEffect(() => {
        if (data && isSuccess) {
            const popup = data.data
            reset({...popup,content:parse(popup.content), start: dayjs(popup.start), end: dayjs(popup.end)})
        }else if(isError){
            onAlert({message:`데이터가 없습니다`,callback:() =>router.back()})
        }
    }, [data,isSuccess,isError]);


    const confirmSubmit = (data) => {
        const action = type.type === 'EDIT' ? onEdit : onAdd

        const formData = {
            ...data,
            start:dayjs(data.start).format("YYYY-MM-DD HH:mm:ss"),
            end:dayjs(data.end).format("YYYY-MM-DD HH:mm:ss"),
        }
        onConfirm({message: `${type.btnText}하시겠습니까?`, btnText: type.btnText, callback: () =>{action(formData)}})
    }

    const onAdd = (data) => {
        addPopup.mutate(data,{
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
        editPopup.mutate(data,{
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
        deletePopup.mutate([popupId],{
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['admin_popup_list'] })
                onAlert({message:`삭제가 완료되었습니다`,callback:() =>router.back()})
            },
            onError: (error) => {
                onAlert({message:'에러가 발생했습니다'})
            }
        })
    }

    const invalidate = () =>{
        queryClient.invalidateQueries({ queryKey: ['admin_popup_list'] })
        queryClient.invalidateQueries({ queryKey: ['admin_popup',popupId] })
    }

    return (
        <form onSubmit={handleSubmit(confirmSubmit)}>
            <Grid container xs={12} sx={{'& .MuiTextField-root': {m: 1},}} spacing={1}>
                <Grid item xs={12}>
                    <CustomInput sx={{width: 865}} control={control} name="title" label="제목" helperText="제목을 입력해주세요"
                                 rules={{
                                     required: '제목을 입력해주세요'
                                 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomInput type={"number"} sx={{width: 205}} control={control} name="leftPosition" label="좌측"
                                 helperText="좌측 위치"/>
                    <CustomInput type={"number"} sx={{width: 205}} control={control} name="topPosition" label="상단"
                                 helperText="상단 위치"/>
                    <CustomInput sx={{width: 205}} control={control} name="width" label="가로"
                                 helperText="가로 사이즈(100px,100% 등 css값)"/>
                    <CustomInput sx={{width: 205}} control={control} name="height" label="세로"
                                 helperText="세로 사이즈(100px,100% 등 css값)"/>
                </Grid>
                <Grid item xs={12}>
                    <CustomSelect control={control} name={"pcYn"} size={"small"} label={"PC"}
                                  list={pcFieldList}
                                  variant={"standard"}
                                  helperText="PC에서 사용"
                                  sx={{width: 205}}/>
                    <CustomSelect control={control} name={"mobileYn"} size={"small"} label={"MOBILE"}
                                  list={mobileFieldList}
                                  variant={"standard"}
                                  helperText="모바일에서 사용"
                                  sx={{width: 205}}/>
                    <CustomInput type={"number"} sx={{width: 205}} control={control} name="afterTime" label="시간"
                                 helperText="입력 시간 동안 보지 않기"/>
                </Grid>
                <Grid item xs={12}>
                    <CustomDateTimePicker control={control} name={"start"} label={"시작일"} width={205}
                                          maxDateTime={endWatch}
                                          rules={{
                                              required:'시작일을 입력해주세요',
                                              validate: (date) => date <= endWatch|| "시작일은 종료일보다 이전이어야 합니다"
                                          }}
                    />

                    <CustomDateTimePicker control={control} name={"end"} label={"종료일"} width={205}
                                          minDateTime={startWatch}
                                          rules={{
                                              required:'종료일을 입력해주세요',
                                              validate: (date) => date >= startWatch || "종료일은 시작일보다 이후여야 합니다"
                                          }}
                    />
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
                        <Button type={"button"} variant="contained" color="warning" onClick={() =>{router.back()}}>뒤로가기</Button>
                        {type.type == 'EDIT' && <Button type={"button"} variant="contained" color={"error"} onClick={confirmDelete}>삭제</Button>}
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default PopupEditorView;
