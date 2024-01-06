'use client'
import React from 'react'
import Sidebar from '@/components/core/Dashboard/Sidebar'
import Modal, { modalData } from '@/components/common/Modal'
import { useState } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { ACCOUNT_TYPE } from '@/utils/constants'

const DashBoardLayout = ({ children, student, instructor }: { children: React.ReactNode, student: React.ReactNode, instructor: React.ReactNode }) => {
    const { loading: authLoading } = useAppSelector(state => state.auth);
    const { loading: profileLoading } = useAppSelector(state => state.profile);
    const { user } = useAppSelector(state => state.profile);

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
                {user && user.accountType === ACCOUNT_TYPE.STUDENT && student}
                {user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && instructor}
            </div>
            {modalData && <Modal modalData={modalData} />}
        </div>
    )
}

export default DashBoardLayout