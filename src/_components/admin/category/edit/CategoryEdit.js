'use client'

import React, {useEffect, useState} from 'react';
import {Button, Card, Grid, Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import CustomInput from "@/components/admin/common/form/CustomInput";
import {useRouter} from "next/navigation";
import {useModalStore} from "@/store/useModalStore";
import {useAddPopup, useDeletePopup, useEditPopup} from "@/hook/admin/usePopupQuery";
import {useAddCategory, useDeleteCategory, useEditCategory} from "@/hook/admin/useCategoryQuery";

const CategoryEdit = ({selectCategory,parentId,invalidate}) => {

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
            categoryId: null,
            categoryName: '',
            parentId: null
        }
    });

    const [type, setType] = useState('');
    const router = useRouter();
    const {onConfirm, onAlert} = useModalStore()
    const addCategory = useAddCategory()
    const editCategory = useEditCategory()
    const deleteCategory = useDeleteCategory()


    useEffect(() => {
        if (selectCategory) {
            setType('EDIT')
            reset(selectCategory)
        } else {
            setType('ADD')
            reset({
                categoryId: null,
                categoryName: '',
                parentId: null
            })
        }
    }, [selectCategory]);

    useEffect(() => {
        if(parentId){
            reset({
                categoryId: null,
                categoryName: '',
                parentId:parentId
            })
            setType('ADD')
        }
    }, [parentId]);

    const confirmSubmit = (data) => {
        const msg = `${type === 'EDIT' ? "수정" : "추가"} 하시겠습니까?`

        onConfirm({message:msg,callback:() => {type === 'EDIT' ? onEdit(data) : onAdd(data)}})

    }

    const onEdit = (data) =>{
        editCategory.mutate(data,{
            onSuccess: () => {
                invalidate()
                onAlert({message:`수정이 완료되었습니다`})
            },
            onError: (error) => {
                onAlert({message:'입력값을 확인해주세요'})
            }
        })
    }

    const onAdd = (data) =>{
        addCategory.mutate(data,{
            onSuccess: () => {
                invalidate()
                onAlert({message:`추가가 완료되었습니다`})
            },
            onError: (error) => {
                onAlert({message:'입력값을 확인해주세요'})
            }
        })
    }

    const confirmDelete = () => {
        onConfirm({message: `삭제하시겠습니까?`, btnText: '삭제', callback: onDelete})
    }

    const onDelete = () =>{
        deleteCategory.mutate(selectCategory.categoryId,{
            onSuccess: () => {
                invalidate()
                onAlert({message:`삭제가 완료되었습니다`})
            },
            onError: (error) => {
                onAlert({message:'입력값을 확인해주세요'})
            }
        })

    }

    return (
        <Grid item xs={7}>
            <Card sx={{p: 2,height:300}}>
                <form onSubmit={handleSubmit(confirmSubmit)}>
                    <Grid container xs={12} spacing={3} sx={{p:2,pt:7,pb:7}}>
                        <Grid item xs={12}>
                            <CustomInput sx={{width: '100%'}} control={control} name="categoryName" label="이름"
                                         helperText="이름을 입력해주세요"
                                         rules={{
                                             required: '이름을 입력해주세요'
                                         }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={2} direction="row">
                                <Button type={"submit"} variant="contained">{type == 'EDIT' ? "수정" : '추가'}</Button>
                                {type == 'EDIT' && <Button type={"button"} variant="contained" color={"error"} onClick={confirmDelete}>삭제</Button>}
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Grid>
    );
};

export default CategoryEdit;
