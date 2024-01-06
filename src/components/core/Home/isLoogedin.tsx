'use client'
import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { getUserDetails } from '@/services/opr/profile'
import { useRouter } from 'next/navigation';

const User = () => {

    const dispacth = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (typeof localStorage.getItem("token") === 'string') {
            const token = JSON.parse(localStorage.getItem("token")!);
            dispacth(getUserDetails(token, router));
        }
    }, []);

    return <div></div>;
}

export default User