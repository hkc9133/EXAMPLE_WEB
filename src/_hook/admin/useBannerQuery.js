import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import bannerService from "@/service/admin/banner";

export const useBannerQuery = (bannerId) => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_banner",bannerId],
        queryFn: () => {return bannerService.getBanner(bannerId)},
        enabled:!!bannerId
    });

    return {isLoading, isError, data, isSuccess};
};

export const useBannerListQuery = (searchParams) => {
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
        queryKey:["admin_banner_list",searchParams],
        queryFn: () =>{return bannerService.getBannerList(params.toString())},
    });

    return {isLoading, isError, data, isSuccess};

};

export const useAddBanner = () => {

    return useMutation({
        mutationFn: (banner) =>{
            return bannerService.addBanner(banner)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useEditBanner = () => {

    return useMutation({
        mutationFn: (banner) =>{
            return bannerService.editBanner(banner)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useDeleteBanner = () => {

    return useMutation({
        mutationFn: (idList) =>{
            return bannerService.deleteBanner(idList)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};
