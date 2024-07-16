import client from "@/lib/client";
import qs from "querystring";

const baseUrl = `/admin/category`;


const categoryService = {
    getCategoryAll: async () => {
        const {data} = await client.get(`${baseUrl}/all`);
        return data;
    },
    getCategoryList: async (params) => {
        const queryString = qs.stringify(params);
        const {data} = await client.get(`${baseUrl}/list?${params}`);
        return data;
    },
    addCategory: async (category) => {
        const {data} = await client.post(`${baseUrl}`,category);
        return data;
    },
    moveCategory: async (category) => {
        console.log(category)
        const {data} = await client.put(`${baseUrl}/move`,category);
        return data;
    },
    editCategory: async (category) => {
        const {data} = await client.put(`${baseUrl}`,category);
        return data;
    },
    deleteCategory: async (categoryId) => {
        const {data} = await client.delete(`${baseUrl}/${categoryId}`);
        return data;
    },
};

export default categoryService;
