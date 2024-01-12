'use client'
import React, { useState } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {

    const [reviewModal, setModal] = useState(null);


    return (
        <div>
            <Sidebar />
            {children}
        </div>
    )
}

export default layout