import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import categoryService from "@/service/admin/category";

export const useCategoryAllQuery = () => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_category_all"],
        queryFn: () => {return categoryService.getCategoryAll()},
    });

    return {isLoading, isError, data, isSuccess};
};

export const useCategoryListQuery = () => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_category_list"],
        queryFn: () => {return categoryService.getCategoryList()},
    });

    return {isLoading, isError, data, isSuccess};
};

export const useCategoryItemListQuery = (param) => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_category_item_list",param],
        queryFn: () => {return categoryService.getCategoryItemList(param)},
        enabled:!!param
    });

    return {isLoading, isError, data, isSuccess};
};

export const useAddCategory = () => {

    return useMutation({
        mutationFn: (category) =>{
            return categoryService.addCategory(category)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useMoveCategory = () => {

    return useMutation({
        mutationFn: (category) =>{
            return categoryService.moveCategory(category)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};
export const useEditCategory = () => {

    return useMutation({
        mutationFn: (category) =>{
            return categoryService.editCategory(category)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useDeleteCategory = () => {

    return useMutation({
        mutationFn: (categoryId) =>{
            return categoryService.deleteCategory(categoryId)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};
