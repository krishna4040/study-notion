import React from 'react'
import ContactSection from '@/components/core/Contact/ContactSection'
import Details from '@/components/core/Contact/Details'
import Footer from '@/components/common/Footer'

const Contact = () => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center gap-8 p-5 lg:items-start lg:flex-row mt-7 lg:p-14'>
                <Details />
                <ContactSection />
            </div>
            <Footer />
        </div>
    )
}

export default Contact