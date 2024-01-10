'use client'
import { useRef, useState, useEffect, MutableRefObject } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from "next/navigation"
import Link from 'next/link'
import Image from 'next/image'
import { logout } from '@/services/opr/auth'

export default function ProfileDropdown() {
    const { user } = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const ref: MutableRefObject<null | HTMLDivElement> = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleLinkClick = (event: MouseEvent) => {
            event.stopPropagation();
        };
        document.addEventListener("mousedown", handleClickOutside);
        ref.current?.addEventListener("click", handleLinkClick);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            ref.current?.removeEventListener("click", handleLinkClick);
        };
    }, [setOpen]);

    if (!user) return <div></div>

    return (
        <button className="relative" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-1">
                <Image
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[30px] rounded-full object-cover"
                    width={160}
                    height={32}
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>
            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                    ref={ref}
                >
                    <Link href="/dashboard/my-profile" onClick={() => setOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscDashboard className="text-lg" />
                            Dashboard
                        </div>
                    </Link>
                    <div
                        onClick={() => {
                            dispatch(logout(router))
                            setOpen(false)
                        }}
                        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                    >
                        <VscSignOut className="text-lg" />
                        Logout
                    </div>
                </div>
            )}
        </button>
    )
}