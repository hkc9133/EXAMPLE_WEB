import client from "@/lib/client";

const baseUrl = `/site_setting`;


const siteSettingService = {
    getSiteSetting: async () => {
        const {data} = await client.get(`${baseUrl}`);
        return data;
    },
};

export default siteSettingService;
