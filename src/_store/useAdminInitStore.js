import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const defaultValue = {
    initData: {
        board: []
    }
}
export const useAdminInitStore = create(
    persist(
        (set) => {
            return {
                defaultValue,
                setData: (data) => {
                    set({
                        initData: {
                            board:data.board
                        }
                    });
                },
                clearData: () => {
                    set(defaultValue)
                },
            };
        },
        {
            name: 'adminInitStore',
            getStorage: () => {
                return localStorage;
            },
        },
    ),
);
