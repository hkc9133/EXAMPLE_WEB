import client from "@/lib/client";

const baseUrl = `/stats`;


const statsService = {
    addPageViewStats: async (data) => {
        await client.post(`${baseUrl}/page_view`,data);
    },
};

export default statsService;
