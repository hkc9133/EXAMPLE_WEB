import client from "@/lib/client";

const baseUrl = `/user`;

const authService = {
    login: async data => {
        const result = await client.post(`${baseUrl}/login`, data);
        return result;
    },
    refresh: async (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const result = await client.post(`${baseUrl}/refresh`,null,config);
        return result;
    },
    tttCheck: async () => {
        const result = await client.get(`${baseUrl}/ttt`);
        return result;
    },
    tttCheck2: async () => {
        const result = await client.get(`${baseUrl}/ttt2`);
        return result;
    },
    tttCheck3: async () => {
        const result = await client.get(`${baseUrl}/ttt3`);
        return result;
    },
    selectFarm: async data => {
        const result = await client.post(`${baseUrl}/select`, data);
        return result;
    },
    join: async data => {
        const result = await client.post(`${baseUrl}/join`, data);
        return result;
    },
    updateUserInfo: async data => {
        const result = await client.put(`${baseUrl}/user/info`, data);
        return result;
    },
    updateContract: async () => {
        const result = await client.put(`${baseUrl}/contract`);
        return result;
    },
    withdrawal: async () => {
        const result = await client.post(`${baseUrl}/withdrawal`);
        return result;
    },
};

export default authService;
