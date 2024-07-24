import {useAuthStore} from "@/store/useAuthStore";
import {useMutation} from "@tanstack/react-query";
import authService from "@/service/auth";
import {useRouter} from "next/navigation";

export const useLogin = () => {
    const router = useRouter();
    const authStore = useAuthStore();

    return useMutation({
        mutationFn: (data) =>{
            return authService.login(data)
        },
        onSuccess: (res) => {
            authStore.saveUser(res)
            localStorage.setItem("access",res.access)
            return res;
        },
        onError: (error) => {
            console.error('Login failed', error);
        },
    });
};


export const useLogout = () => {
    const {logout} = useAuthStore();

    return useMutation({
        mutationFn:authService.logout,
        onSuccess: () => {
            logout()
        },
        onError: (error) => {
            logout()
        },
    });
};
