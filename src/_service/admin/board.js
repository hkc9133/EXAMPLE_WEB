import client from "@/lib/client";
import qs from "query-string";

const baseUrl = `/admin/board`;


const boardService = {
    getBoard: async (boardEnName) => {
        const {data} = await client.get(`${baseUrl}/${boardEnName}`);
        return data;
    },
    getBoardList: async (params) => {
        const queryString = qs.stringify(params);
        const {data} = await client.get(`${baseUrl}/list?${params}`);
        return data;
    },
    addBoard: async (board) => {

        const {data} = await client.post(`${baseUrl}`,board);
        return data;
    },
    editBoard: async (board) => {
        const formData = new FormData();
        Object.entries(board).forEach(([key, value]) => {
            if (value != null) {
                formData.append(key, value);
            }
        });

        const {data} = await client.put(`${baseUrl}`,board);
        return data;
    },
    deleteBoard: async (boardEnName) => {
        const {data} = await client.delete(`${baseUrl}/${boardEnName}`);
        return data;
    },
};

export default boardService;
