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

    // state fetching
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.profile);
    const { totalItems } = useAppSelector(state => state.cart);

    // api call
    const [subLinks, setSubLinks] = useState<Array<category>>([]);
    const fetchSubLinks = async () => {
        try {
            const result = await axios.get(categories.CATEGORIES_API);
            setSubLinks(result?.data?.data);
        } catch (error: any) {
            console.log('could not fetch categories list');
        }
    };
    useEffect(() => {
        fetchSubLinks();
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
                                                <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                    <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'></div>
                                                    {
                                                        !subLinks.length ? <div></div> :
                                                            subLinks.map((ele, idx) => {
                                                                return <Link href={`/catalog/${ele.name}`} key={idx}><p className='p-3 text-lg font-semibold rounded-md hover:bg-richblack-100'>{ele.name}</p></Link>
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

                {/* Login/sign-up/dashboard/logout/cart/search/dp */}
                <div className='flex items-center justify-center gap-3'>
                    {
                        token && user && user?.accountType != 'Instructor' &&
                        <Link href='/dashboard/cart' className='relative'>
                            <AiOutlineShoppingCart className='text-[#999DAA] text-lg' />
                            {totalItems > 0 && <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">{totalItems}</span>}
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