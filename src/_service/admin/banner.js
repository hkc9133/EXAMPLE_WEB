import client from "@/lib/client";
import qs from "query-string";

const baseUrl = `/admin/banner`;


const bannerService = {
    getBanner: async (bannerId) => {
        const {data} = await client.get(`${baseUrl}/${bannerId}`);
        return data;
    },
    getBannerList: async (params) => {
        const {data} = await client.get(`${baseUrl}/list?${params}`);
        return data;
    },
    addBanner: async (banner) => {
        const formData = new FormData();

        Object.entries(banner).forEach(([key, value]) => {
            switch (key) {
                case 'bannerFileList':
                case 'newBannerFileList':
                case 'deleteBannerFileList':
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
    editBanner: async (banner) => {
        const formData = new FormData();

        Object.entries(banner).forEach(([key, value]) => {
            switch (key) {
                case 'bannerFileList':
                case 'newBannerFileList':
                    // 빈 문자열을 빈 배열로 변환하여 추가
                    if (value && Array.isArray(value)) {
                        value.forEach(item => {
                            formData.append(key, item)
                        });
                    } else {
                        formData.append(key, []);
                    }
                    break;
                case 'deleteBannerFileList':
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
        const {data} = await client.put(`${baseUrl}/${banner.bannerId}`,formData, config);
        return data;
    },
    deleteBanner: async (idList) => {
        const queryString = qs.stringify({idList: idList}, {arrayFormat: 'comma'});
        const {data} = await client.delete(`${baseUrl}?${queryString}`);
        return data;
    },
};

export default bannerService;
