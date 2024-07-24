import client from "@/lib/client";
import qs from "query-string";

const baseUrl = `/admin/init`;


const initService = {
    getInitData: async (boardEnName) => {
        const {data} = await client.get(`${baseUrl}/data`);
        return data;
    },
};

export default initService;
