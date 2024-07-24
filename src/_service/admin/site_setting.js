import client from "@/lib/client";
import qs from "query-string";

const baseUrl = `/admin/site_setting`;


const siteSettingService = {
    getSiteSetting: async (popupId) => {
        const {data} = await client.get(`${baseUrl}`);
        return data;
    },
    editSiteSetting: async (settingList) => {
        const formData = new FormData();

        Object.entries(settingList).forEach(([key, value]) => {
            switch (key) {
                case 'faviconFileList':
                case 'ogImageFileList':
                case 'newFaviconFileList':
                case 'newOgImageFileList':
                    // 빈 문자열을 빈 배열로 변환하여 추가
                    if (value && Array.isArray(value)) {
                        value.forEach(item => {
                            formData.append(key, item)
                        });
                    } else {
                        formData.append(key, []);
                    }
                    break;
                case 'deleteFaviconFileList':
                case 'deleteOgImageFileList':
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

        const {data} = await client.put(`${baseUrl}`,formData,config);
        return data;
    },
};

export default siteSettingService;
