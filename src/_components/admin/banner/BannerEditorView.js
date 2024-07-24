'use client'

import React, {useEffect, useState} from 'react';
import {useForm, useWatch} from "react-hook-form";
import {Button, Grid, Stack} from "@mui/material";
import CustomInput from "@/components/admin/common/form/CustomInput";
import CustomSelect from "@/components/admin/common/form/CustomSelect";
import dynamic from "next/dynamic";
import Loader from "@/components/common/loader/Loader";
import {useRouter, useSearchParams} from 'next/navigation'
import {useQueryClient} from "@tanstack/react-query";
import {useModalStore} from "@/store/useModalStore";
import {useAddBanner, useDeleteBanner, useEditBanner, useBannerQuery} from "@/hook/admin/useBannerQuery";
import parse from "html-react-parser";
import {useCategoryItemListQuery, useCategoryListQuery} from "@/hook/admin/useCategoryQuery";
import FileUploadInput from "@/components/admin/common/form/file/FileUploadInput";
import {emailVal, urlVal} from "@/constants/validation";


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

const BannerEditorView = ({bannerId}) => {

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
            bannerId: null,
            bannerTitle: '',
            url: '',
            useYn: 'Y',
            bannerFileList: [],
        }
    });

    const router = useRouter();
    const {onConfirm, onAlert} = useModalStore()
    const [type, setType] = useState({type: bannerId ? "EDIT" : 'WRITE', btnText: bannerId ? "수정" : '추가'})

    const queryClient = useQueryClient()
    const {data, isError, isLoading, isSuccess} = useBannerQuery(bannerId)

    const addBanner = useAddBanner()
    const editBanner = useEditBanner()
    const deleteBanner = useDeleteBanner()


    const [isEditorLoading, setIsEditorLoading] = useState(false);

    useEffect(() => {
        if (data && isSuccess) {
            const banner = data.data
            reset({
                bannerId: banner.bannerId,
                bannerTitle: banner.bannerTitle,
                url: banner.url,
                useYn: banner.useYn,
                bannerFileList: banner.bannerFileList,
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
        addBanner.mutate(data, {
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
        editBanner.mutate(data, {
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
        deleteBanner.mutate([bannerId], {
            onSuccess: async () => {
                await queryClient.invalidateQueries({queryKey: ['admin_banner_list', "", boardEnName]})
                onAlert({message: `삭제가 완료되었습니다`, callback: () => router.back()})
            },
            onError: (error) => {
                onAlert({message: '에러가 발생했습니다'})
            }
        })
    }

    const invalidate = async () => {
        await queryClient.invalidateQueries({queryKey: ['admin_banner_list']})
        await queryClient.invalidateQueries({queryKey: ['admin_banner', bannerId]})
    }

    return (
        <form onSubmit={handleSubmit(confirmSubmit)}>
            <Grid container xs={12} sx={{'& .MuiTextField-root': {m: 1, maxWidth: 865},}} spacing={1}>
                <Grid item xs={12}>
                    <CustomInput sx={{width: '100%'}} control={control} name="bannerTitle" label="제목" helperText="제목을 입력해주세요"
                                 rules={{
                                     required: '제목을 입력해주세요'
                                 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomInput sx={{width: '100%'}} control={control} name="url" label="URL" helperText={"배너 클릭 시 이동 할 URL을 입력해주세요"}
                                 rules={{
                                     required: '배너 클릭 시 이동 할 URL을 입력해주세요',
                                     pattern: {
                                         value: urlVal,
                                         message: "URL 형식을 확인해주세요"
                                     }
                                 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomSelect control={control} name={"useYn"} size={"small"} label={"사용 여부"}
                                  nullAllow={false}
                                  list={ynList}
                                  variant={"standard"}
                                  sx={{width: 205}}
                    />
                </Grid>
                <Grid item xs={12} sx={{ml: 1, mt: 1}}>
                    <FileUploadInput control={control} width={868} txt={"썸네일"} maxCnt={1} accept={"image/*"} name="newBannerFileList" oldListName={"bannerFileList"} deleteListName={"deleteBannerFileList"}/>
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

export default BannerEditorView;
