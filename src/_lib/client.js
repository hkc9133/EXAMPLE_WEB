import axios from "axios";
import {Cookies} from "react-cookie";

const noReRequestList = ["/user/login"]

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
});

client.interceptors.request.use(
    async config => {
        const isServer = typeof window === "undefined";
        // const session = await getSession()
        if (!isServer) {
            const token = localStorage.getItem("access");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// 응답 인터셉터 설정
client.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const {response} = error;
        const isServer = typeof window === "undefined";
        if (response.status === 401 && !noReRequestList.includes(response.config.url)) {
            // 토큰 갱신 시도
            try {
                const cookies = new Cookies();
                const refreshToken = cookies.get("refresh");

                const {
                    data,
                    headers
                } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/refresh`, null, {withCredentials: true});

                const newAccessToken = data.data.access
                localStorage.setItem("access", newAccessToken)

                // 새로운 액세스 토큰을 헤더에서 추출하여 쿠키에 설정
                // const newAccessToken = headers['set-cookie'][0].split(';')[0].split('=')[1];
                // const newRefreshToken = headers['set-cookie'][1].split(';')[0].split('=')[1];
                //
                // setCookie(null, 'accessToken', newAccessToken, {
                //     maxAge: 15 * 60, // 15분
                //     path: '/',
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV !== 'development',
                //     sameSite: 'strict',
                // });
                //
                // setCookie(null, 'refreshToken', newRefreshToken, {
                //     maxAge: 30 * 24 * 60 * 60, // 30일
                //     path: '/',
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV !== 'development',
                //     sameSite: 'strict',
                // });

                // 원래 요청 재시도
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return client(error.config);
            } catch (refreshError) {
                window.location.href = `/logout`;
            }
        } else if (response.status === 403) {
            console.log("40333333333")
            window.location.href = `/${error.response.status}`;
        } else {
            return Promise.reject(error.response);
        }


    },
)
;

export default client;
