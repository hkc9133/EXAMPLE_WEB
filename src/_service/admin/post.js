import client from "@/lib/client";
import qs from "query-string";

const baseUrl = `/admin/board/post`;


const postService = {
    getPost: async (postId) => {
        const {data} = await client.get(`${baseUrl}/${postId}`);
        return data;
    },
    getPostList: async (params) => {
        const {data} = await client.get(`${baseUrl}/list?${params}`);
        return data;
    },
    addPost: async (post) => {
        const formData = new FormData();

        Object.entries(post).forEach(([key, value]) => {
            switch (key) {
                case 'fileList':
                case 'newFileList':
                case 'deleteFileList':
                case 'thumbFileList':
                case 'newThumbFileList':
                case 'deleteThumbFileList':
                    if (value && Array.isArray(value)) {
                        value.forEach(item => formData.append(key, item));
                    } else {
                        formData.append(key, []);
                    }
                    break;
                default:
                    if (value != null) {
                        formData.append(key, value);
                    }
                    break;
            }
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await client.post(`${baseUrl}`,formData,config);
        return data;
    },
    editPost: async (post) => {
        const formData = new FormData();

        Object.entries(post).forEach(([key, value]) => {
            switch (key) {
                case 'fileList':
                case 'thumbFileList':
                case 'newFileList':
                case 'newThumbFileList':
                    // 빈 문자열을 빈 배열로 변환하여 추가
                    if (value && Array.isArray(value)) {
                        value.forEach(item => {
                            formData.append(key, item)
                        });
                    } else {
                        formData.append(key, []);
                    }
                    break;
                case 'deleteFileList':
                case 'deleteThumbFileList':
                    if (value && Array.isArray(value)) {
                        value.forEach((item,i) => {
                            formData.append(`${key}[${i}].fileId`, item.fileId)
                        });

                    }
                    break;
                default:
                    if (value != null) {
                        formData.append(key, value);
                    }
                    break;
            }
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await client.put(`${baseUrl}/${post.postId}`,formData, config);
        return data;
    },
    deletePost: async (idList) => {
        const queryString = qs.stringify({idList: idList}, {arrayFormat: 'comma'});
        const {data} = await client.delete(`${baseUrl}?${queryString}`);
        return data;
    },
};

export default postService;
