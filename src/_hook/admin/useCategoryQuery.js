import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import categoryService from "@/service/admin/category";

const invalidate = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    queryClient.invalidateQueries({ queryKey: ['admin_category_all'] })

}

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
