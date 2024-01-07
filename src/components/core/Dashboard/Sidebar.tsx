import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '@/services/opr/auth'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc'
import Link from 'next/link';
import { modalData } from '@/components/common/Modal'
import { usePathname, useRouter } from 'next/navigation'

const Sidebar = ({ setModalData }: { setModalData: React.Dispatch<React.SetStateAction<modalData | null>> }) => {

    const { user, loading: profileLoading } = useAppSelector(state => state.profile);
    const { loading: authLoading } = useAppSelector(state => state.auth);

    const dispacth = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();


    const MacthRoute = (route: string) => {
        return route === pathname;
    }

    if (authLoading || profileLoading) {
        return <div className='spinner'></div>
    }

    return (
        <div className='flex flex-col min-w-[200px] border-r h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

            <div className='flex flex-col gap-0'>
                {
                    sidebarLinks.map((element, index) => {
                        if (element.type && user?.accountType !== element.type) return <div key={index}></div>;
                        else {
                            return (
                                <Link href={element.path} key={index}>

                                    <div className={`${MacthRoute(element.path) ? 'bg-yellow-800' : 'bg-opacity-0'} relative px-8 py-2 text-sm font-medium`}>

                                        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${MacthRoute(element.path) ? 'opacity-100' : 'opacity-0'}`}></span>

                                        <div className='flex items-center gap-x-2'>

                                            <element.icon className='text-[#838894] text-lg' />

                                            <span className='text-[#838894]'>{element.name}</span>

                                        </div>

                                    </div>

                                </Link>
                            )
                        }
                    })
                }
            </div>

            <div className='my-6 h-[1px] w-10/12 mx-auto bg-richblack-700'></div>

            <div className='flex flex-col justify-center gap-0'>
                <Link href={'/dashboard/settings'}>

                    <div className={`${MacthRoute('/dashboard/settings') ? 'bg-yellow-800' : 'bg-opacity-0'} relative px-8 py-2 text-sm font-medium`}>

                        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${MacthRoute('/dashboard/settings') ? 'opacity-100' : 'opacity-0'}`}></span>

                        <div className='flex items-center gap-x-2'>

                            <VscSettingsGear className='text-lg text-[#838894]' />

                            <span className='text-[#838894]'>Settings</span>

                        </div>

                    </div>

                </Link>

                <button onClick={() => {
                    setModalData({
                        text1: "Are You sure",
                        text2: "You will be Logged out of your Account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => { dispacth(logout(router)) },
                        btn2Handler: () => { setModalData(null); }
                    })
                }} className='px-8 py-2'>
                    <div className='flex items-center gap-3'>
                        <VscSignOut className='text-lg text-[#838894]' />
                        <span className='text-[#838894]'>Logout</span>
                    </div>
                </button>

            </div>

        </div>
    )
}

export default Sidebar