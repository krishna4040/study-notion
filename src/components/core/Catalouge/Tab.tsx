'use client'
import React, { useState } from 'react'

const Tab = () => {
    const [active, setActive] = useState(1)
    return (
        <div className="flex my-4 text-sm border-b border-b-richblack-600">
            <p
                className={`px-4 py-2 ${active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                    } cursor-pointer`}
                onClick={() => setActive(1)}
            >
                Most Popular
            </p>
            <p
                className={`px-4 py-2 ${active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                    } cursor-pointer`}
                onClick={() => setActive(2)}
            >
                New
            </p>
        </div>
    )
}

export default Tab