// HamburgerMenu.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div onClick={toggleMenu} className={`text-richblack-100`}>
            {
                !isOpen ? <GiHamburgerMenu className='text-lg' /> : <RxCross2 className='text-lg scale-in-center' />
            }
            <div className={`${isOpen ? 'block slide-in-blurred-left' : 'hidden slide-in-blurred-right'} fixed left-0 top-[3.5rem] min-w-max lg:block`}>
                <Sidebar />
            </div>
        </div>
    );
};

export default HamburgerMenu;
