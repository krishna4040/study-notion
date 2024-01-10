'use client'
import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { getUserDetails } from '@/services/opr/profile'
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/feature/authSlice';
const User = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (typeof localStorage.getItem("token") === 'string') {
            const token = JSON.parse(localStorage.getItem("token")!);
            dispatch(getUserDetails(token, router));
            dispatch(setToken(token));
        }
    }, []);

    return <div></div>;
}

export default User