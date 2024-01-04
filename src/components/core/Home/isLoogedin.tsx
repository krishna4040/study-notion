'use client'
import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { getUserDetails } from '@/services/opr/profile'
import { useRouter } from 'next/navigation';

const User = (): null => {

    const dispacth = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const token = JSON.parse(localStorage.getItem("token")!)
            getUserDetails(token, router)(dispacth)
        }
    }, []);

    return null;
}

export default User