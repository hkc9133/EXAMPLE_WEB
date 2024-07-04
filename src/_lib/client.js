import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
});

client.interceptors.request.use(
    async config => {
        const isServer = typeof window === "undefined";
        const session = await getSession()
        if (!isServer && session) {
            config.headers.Authorization = `Bearer ${session.access}`;
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
        const isServer = typeof window === "undefined";

        console.log("AXIOS ERROR");
        console.log(error);

        if (error.response.status == 401) {
            if (!isServer) {
                await signOut({
                    callbackUrl: `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/login`,
                });
            } else {
                redirect("/auth/login");
            }
        } else if (error.response.status == 403) {
            if (!isServer) {
                window.location.href = `/${error.response.status}`;
            } else {
                redirect(`/${error.response.status}`);
            }
        } else {
            return Promise.reject(error.response);
        }
    },
);

export default client;
