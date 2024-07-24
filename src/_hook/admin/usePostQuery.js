import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import postService from "@/service/admin/post";

export const usePostQuery = (postId) => {

    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery({
        queryKey:["admin_post",postId],
        queryFn: () => {return postService.getPost(postId)},
        enabled:!!postId
    });

    return {isLoading, isError, data, isSuccess};
};

export const usePostListQuery = (searchParams,boardEnName) => {
    const params = new URLSearchParams(searchParams)

    params.set("boardEnName",boardEnName)

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
        queryKey:["admin_post_list",searchParams,boardEnName],
        queryFn: () =>{return postService.getPostList(params.toString())},
    });

    return {isLoading, isError, data, isSuccess};

};

export const useAddPost = () => {

    return useMutation({
        mutationFn: (board) =>{
            return postService.addPost(board)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useEditPost = () => {

    return useMutation({
        mutationFn: (board) =>{
            return postService.editPost(board)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};

export const useDeletePost = () => {

    return useMutation({
        mutationFn: (idList) =>{
            return postService.deletePost(idList)
        },
        onSuccess: (res) => {
            return res;
        },
        onError: (error) => {
            console.error('failed', error);
        },
    });
};
