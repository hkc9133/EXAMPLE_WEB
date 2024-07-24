import client from "@/lib/client";
import qs from "query-string";

const baseUrl = `/admin/category`;


const categoryService = {
    getCategoryAll: async () => {
        const {data} = await client.get(`${baseUrl}/all`);
        return data;
    },
    getCategoryList: async () => {
        const {data} = await client.get(`${baseUrl}/list`);
        return data;
    },
    getCategoryItemList: async (param) => {
        const queryString = qs.stringify(param);
        const {data} = await client.get(`${baseUrl}/item/list?${queryString}`);
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
