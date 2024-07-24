import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import siteSettingService from "@/service/admin/site_setting";

export const useSiteSettingQuery = () => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["site_setting"],
        queryFn: () =>{return siteSettingService.getSiteSetting()},
    });

    return {isLoading, isError, data, isSuccess};

};

export const useEditSiteSetting = () => {

    return useMutation({
        mutationFn: (settingList) =>{
            return siteSettingService.editSiteSetting(settingList)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};
