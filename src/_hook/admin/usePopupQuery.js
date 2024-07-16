import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import popupService from "@/service/admin/popup";

const invalidate = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    queryClient.invalidateQueries({ queryKey: ['admin_popup','admin_popup_list'] })

}

export const usePopupQuery = (popupId) => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_popup",popupId],
        queryFn: () => {return popupService.getPopup(popupId)},
        enabled:!!popupId
    });

    return {isLoading, isError, data, isSuccess};
};

export const usePopupListQuery = (searchParams) => {
    const params = new URLSearchParams(searchParams)
    if (!params.has("pageNum")) {
        params.set("pageNum", 1)
    }
    if (!params.has("pageSize")) {
        params.set("pageSize", 10)
    }

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_popup_list",searchParams],
        queryFn: () =>{return popupService.getPopupList(params.toString())},
    });

    return {isLoading, isError, data, isSuccess};

};

export const useAddPopup = () => {

    return useMutation({
        mutationFn: (popup) =>{
            return popupService.addPopup(popup)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useEditPopup = () => {

    return useMutation({
        mutationFn: (popup) =>{
            return popupService.editPopup(popup)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useDeletePopup = () => {

    return useMutation({
        mutationFn: (popupId) =>{
            return popupService.deletePopup(popupId)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};
