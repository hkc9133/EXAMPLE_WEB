import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import boardService from "@/service/admin/board";

export const useBoardQuery = (boardEnName) => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_board",boardEnName],
        queryFn: () => {return boardService.getBoard(boardEnName)},
        enabled:!!boardEnName
    });

    return {isLoading, isError, data, isSuccess};
};

export const useBoardListQuery = (searchParams) => {
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
        queryKey:["admin_board_list",searchParams],
        queryFn: () =>{return boardService.getBoardList(params.toString())},
    });

    return {isLoading, isError, data, isSuccess};

};

export const useAddBoard = () => {

    return useMutation({
        mutationFn: (board) =>{
            return boardService.addBoard(board)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useEditBoard = () => {

    return useMutation({
        mutationFn: (board) =>{
            return boardService.editBoard(board)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useDeleteBoard = () => {

    return useMutation({
        mutationFn: (boardEnName) =>{
            return boardService.deleteBoard(boardEnName)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};
