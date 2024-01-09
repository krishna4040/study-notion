'use client'
import React, { useEffect, useState } from 'react'
import { NavbarLinks } from '@/data/navbar-links'
import logo from '@/assets/Logo/Logo-Full-Light.png'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from '@/services/api'
import axios from 'axios'
import { category } from '@/lib/types'
import HamburgerMenu from '../core/Dashboard/HamburgerMenu'

const Navbar = () => {

    const pathname = usePathname();
    const machRoute = (route: string) => {
        return pathname === route;
    }

    // state fecthing
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.profile);
    const { totalItems } = useAppSelector(state => state.cart);

    // api call
    const [subLinks, setSubLinks] = useState<Array<category>>([]);
    const fecthSubLinks = async () => {
        try {
            const result = await axios.get(categories.CATEGORIES_API);
            setSubLinks(result?.data?.data);
        } catch (error: any) {
            console.log('could not fecth categories list');
        }
    };
    useEffect(() => {
        fecthSubLinks();
    }, []);

    return (
        <div className={`flex items-center justify-center h-14 border-b-[1px] border-b-richblack-700 bg-richblack-900 ${pathname.indexOf('dashboard') !== -1 ? 'fixed top-0 left-0 right-0 z-30' : ''}`}>

            <div className='flex items-center justify-between w-11/12 mx-auto max-w-maxContent'>

                {token !== null && <div className='block lg:hidden'><HamburgerMenu /></div>}

                {/* Logo */}
                <Link href={'/'}>
                    <Image src={logo} alt="#" width={160} height={32} loading='lazy' />
                </Link>

                {/* Navigation */}
                <ul className='hidden gap-6 lg:flex text-richblack-25'>
                    {
                        NavbarLinks.map((element, index) => {
                            return (
                                <li key={index}>
                                    {
                                        element.title === "Catalog" ?
                                            <div className='relative z-10 flex items-center gap-2 transition-all duration-200 group'>
                                                <p>{element.title}</p>
                                                <IoIosArrowDropdownCircle />
                                                <div className='absolute flex-col flex invisible p-4 transition-all duration-200 rounded-md left-1/2 -top-16 group-hover:visible lg:w-80 bg-richblack-5 text-richblue-900 translate-x-[-50%] translate-y-[50%]'>
                                                    <div className='absolute w-6 h-6 rotate-45 rounded-sm -top-1 right-28 bg-richblack-5 -z-10'></div>
                                                    {
                                                        !subLinks.length ? <div></div> :
                                                            subLinks.map((ele, idx) => {
                                                                return <Link href={`/catalouge/${ele.name}`}><p className='p-3 text-lg font-semibold rounded-md hover:bg-richblack-100' key={idx}>{ele.name}</p></Link>
                                                            })
                                                    }
                                                </div>
                                            </div>
                                            :
                                            <Link href={element.path!}>
                                                <p className={`${machRoute(element.path!) ? 'text-yellow-25' : 'text-richblack-25'}`}>{element.title}</p>
                                            </Link>
                                    }
                                </li>
                            )
                        })
                    }

                </ul>

                {/* Login/signup/dashboard/logout/cart/search/dp */}
                <div className='flex items-center justify-center gap-3'>
                    {
                        token && user && user?.accountType != 'Instructor' &&
                        <Link href='/dashboard/cart' className='relative'>
                            <AiOutlineShoppingCart className='text-[#999DAA] text-lg' />
                            {totalItems > 0 && <span>{totalItems}</span>}
                        </Link>
                    }
                    {token === null && <Link href='/login'><button className='px-3 py-2 border rounded-md border-richblack-700 bg-richblack-800 text-richblack-100'>Login</button></Link>}
                    {token === null && <Link href='/signup'><button className='px-3 py-2 border rounded-md border-richblack-700 bg-richblack-800 text-richblack-100'>Sign Up</button></Link>}
                    {token !== null && <ProfileDropDown />}
                </div>

            </div>

        </div>
    )
}

export default Navbar