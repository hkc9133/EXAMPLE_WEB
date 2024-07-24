import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import siteSettingService from "@/service/user/site_setting";

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
