import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => {
            return {
                user: null,
                isLogin: false,
                isAdmin: false,
                saveUser: (user) => {
                    set({user, isLogin: true,isAdmin:user.role == "ROLE_ADMIN"});
                },
                checkLogin: () => {
                    // const accessToken = getCookie('accessToken');
                    const accessToken = '23';
                    if (accessToken) {
                        set({isLogin: true});
                    } else {
                        set({user: null, isLogin: false});
                    }
                },
                logout: () => {
                    localStorage.removeItem("access")
                    set({user: null, isLogin: false});
                },
            };
        },
        {
            name: 'authStore',
            skipHydration: true, //set this true
            // storage: createJSONStorage(() => localStorage)
        },
    ),
);
