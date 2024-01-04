import React from 'react'
import Sidebar from '@/components/core/Dashboard/Sidebar'
import Modal, { modalData } from '@/components/common/Modal'
import { useState } from 'react'
import { useAppSelector } from '@/lib/hooks'

const Dashboard = ({ children }) => {

    const { loading: authLoading } = useAppSelector(state => state.auth);
    const { loading: profileLoading } = useAppSelector(state => state.profile);

    const [modalData, setModalData] = useState<modalData | null>(null);

    if (authLoading || profileLoading) {
        return <div className='text-black spineer'></div>
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <div className='fixed top-[3.5rem] hidden min-w-max lg:block'>
                <Sidebar setModalData={setModalData} />
            </div>
            <div className='w-11/12 mx-auto py-10 max-w-[1000px] relative top-[3.5rem]'>
                {children}
            </div>
            {modalData && <Modal modalData={modalData} />}
        </div>
    )
}

export default Dashboard