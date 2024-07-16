'use client';
import React, {useEffect, useState} from 'react';
import CategoryList from "@/components/admin/category/list/CategoryList";
import CategoryEdit from "@/components/admin/category/edit/CategoryEdit";
import {Button, Grid} from "@mui/material";
import {useCategoryAllQuery, useEditCategory, useMoveCategory} from "@/hook/admin/useCategoryQuery";
import {useModalStore} from "../../../_store/useModalStore";
import {useQueryClient} from "@tanstack/react-query";

const CategoryManage = () => {

    const queryClient = useQueryClient()
    const {onConfirm, onAlert} = useModalStore()
    const {data, isError, isLoading, isSuccess} = useCategoryAllQuery()
    const moveCategory = useMoveCategory();

    const [selectCategory, setSelectCategory] = useState(null);
    const [parentId, setParentId] = useState(null);

    useEffect(() => {
        if(selectCategory){
            setParentId(null)
        }
    }, [selectCategory]);

    const invalidate = () =>{
        queryClient.invalidateQueries({queryKey: ['admin_category_all']})
    }

    const handleMove = (category) => {
        moveCategory.mutate(category, {
            onSuccess: () => {
                setSelectCategory(null)
                invalidate()
                onAlert({message: `이동이 완료되었습니다`})
            },
            onError: (error) => {
                onAlert({message: '입력값을 확인해주세요'})
            }
        })
    }


    return (
        <>
            <Grid container sx={{p: 2}} spacing={1}>
                <Grid item>
                    <Button type={"button"} variant={"contained"} onClick={() => {
                        setSelectCategory(null)
                    }}>카테고리 추가</Button>
                </Grid>
                {selectCategory && selectCategory.parentId == null && (
                    <Grid item>
                        <Button type={"button"} variant={"contained"} onClick={() => {
                            setParentId(selectCategory.categoryId);
                        }}>카테고리 ITEM 추가</Button>
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={2}>
                <CategoryList data={data ? data.data : []} selectCategory={selectCategory}
                              setSelectCategory={setSelectCategory} handleMove={handleMove} setParentId={setParentId}/>
                <CategoryEdit selectCategory={selectCategory} parentId={parentId} invalidate={invalidate}/>
            </Grid>
        </>
    );
};

export default CategoryManage;
