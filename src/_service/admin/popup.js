import client from "@/lib/client";
import qs from "query-string";

const baseUrl = `/admin/popup`;


const popupService = {
    getPopup: async (popupId) => {
        const {data} = await client.get(`${baseUrl}/${popupId}`);
        return data;
    },
    getPopupList: async (params) => {
        const queryString = qs.stringify(params);
        const {data} = await client.get(`${baseUrl}/list?${params}`);
        return data;
    },
    addPopup: async (popup) => {
        const formData = new FormData();
        Object.entries(popup).forEach(([key, value]) => {
            if (value != null) {
                formData.append(key, value);
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
    editPopup: async (popup) => {
        const formData = new FormData();
        Object.entries(popup).forEach(([key, value]) => {
            if (value != null) {
                formData.append(key, value);
            }
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await client.put(`${baseUrl}/${popup.popupId}`,formData,config);
        return data;
    },
    deletePopup: async (idList) => {
        const queryString = qs.stringify({idList: idList}, {arrayFormat: 'comma'});
        const {data} = await client.delete(`${baseUrl}?${queryString}`);
        return data;
    },
};

export default popupService;
