import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import initService from "@/service/admin/init";

export const useInitDataQuery = () => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_init_data"],
        queryFn: () => {return initService.getInitData()},
    });

    return {isLoading, isError, data, isSuccess};
};
