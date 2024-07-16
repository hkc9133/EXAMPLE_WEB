'use client';

import { useEffect } from 'react';
import {useAuthStore} from "./useAuthStore";


export default function Hydrations() {
    useEffect(() => {
        useAuthStore.persist.rehydrate();
    }, []);

    return null;
}
