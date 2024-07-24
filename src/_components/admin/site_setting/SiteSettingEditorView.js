'use client';

import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useModalStore} from "@/store/useModalStore";
import {useQueryClient} from "@tanstack/react-query";
import {Button, Grid, Stack} from "@mui/material";
import CustomInput from "@/components/admin/common/form/CustomInput";
import {useEditSiteSetting, useSiteSettingQuery} from "@/hook/admin/useSiteSettingQuery";
import FileUploadInput from "@/components/admin/common/form/file/FileUploadInput";

const SiteSettingEditorView = () => {
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
            siteTitle: '',
            siteDesc: '',
            keyword:'',
            faviconFileList: [],
            newFaviconFileList: [],
            deleteFaviconFileList: [],
            ogImageFileList: [],
            newOgImageFileList: [],
            deleteOgImageFileList: [],
        }
    });


    const router = useRouter();
    const {onConfirm, onAlert} = useModalStore()

    const queryClient = useQueryClient()
    const {data, isError, isLoading, isSuccess} = useSiteSettingQuery()
    const editSiteSetting = useEditSiteSetting()

    useEffect(() => {
        if (!isLoading && isSuccess && data) {
            const setting = data.data;

            reset({
                ...setting,
                newFaviconFileList: [],
                deleteFaviconFileList: [],
                newOgImageFileList: [],
                deleteOgImageFileList: [],
            })
        }
    }, [isLoading, isSuccess, data]);


    const confirmSubmit = (data) => {
        onConfirm({
            message: `수정하시겠습니까?`, btnText: '수정', callback: () => {
                onEdit(data)
            }
        })
    }

    const onEdit = (data) => {
        editSiteSetting.mutate(data, {
            onSuccess: () => {
                invalidate()
                onAlert({message: `수정이 완료되었습니다`})
                router.refresh()
            },
            onError: (error) => {
                onAlert({message: '입력값을 확인해주세요'})
            }
        })
    }

    const invalidate = async () => {
        await queryClient.invalidateQueries({queryKey: ['site_setting']})
    }

    return (
        <form onSubmit={handleSubmit(confirmSubmit)}>
            <Grid container xs={12} sx={{'& .MuiTextField-root': {m: 1, maxWidth: 865},}}>
                <Grid item xs={12}>
                    <CustomInput sx={{width: '100%'}} control={control} name="siteTitle" label="사이트 이름"
                                 helperText="사이트 이름을 입력해주세요"
                        // rules={{
                        //     required: '사이트 이름을 입력해주세요'
                        // }}
                    />
                    <CustomInput sx={{width: '100%'}} control={control} name="siteDesc" label="사이트 설명"
                                 helperText="사이트 설명을 입력해주세요"
                        // rules={{
                        //     required: '사이트 설명을 입력해주세요'
                        // }}
                    />
                    <CustomInput sx={{width: '100%'}} control={control} name="keyword" label="키워드"
                                 helperText=",로 구분지어 키워드를 입력해주세요"
                        // rules={{
                        //     required: '사이트 설명을 입력해주세요'
                        // }}
                    />
                </Grid>
                <Grid item xs={12} sx={{ml: 1, mt: 1}}>
                    <FileUploadInput control={control} width={868} txt={"Favicon"} helperText=".ico 확장자 파일 업로드"
                                     maxCnt={1} accept={".ico"} name="newFaviconFileList"
                                     oldListName={"faviconFileList"} deleteListName={"deleteFaviconFileList"}/>
                </Grid>
                <Grid item xs={12} sx={{ml: 1, mt: 1}}>
                    <FileUploadInput control={control} width={868} txt={"OG IMAGE"}
                                     helperText="최소:600 x 315, 권장:1200 x 630" maxCnt={1} accept={"image/*"}
                                     name="newOgImageFileList" oldListName={"ogImageFileList"}
                                     deleteListName={"deleteOgImageFileList"}/>
                </Grid>
                <Grid item xs={12} sx={{ml: 1, mt: 5}}>
                    <Stack spacing={2} direction="row">
                        <Button type={"submit"} variant="contained">수정</Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default SiteSettingEditorView;
