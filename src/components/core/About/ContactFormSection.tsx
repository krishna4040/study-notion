import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactFormSection = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-5 px-8 py-20 lg:gap-8 lg:px-96'>

            <div className='flex flex-col items-center justify-center gap-3'>
                <h1 className='text-[#F1F2FF] font-inter font-semibold text-4xl'>Get in Touch</h1>

                <p className='text-center font-medium font-inter text-[#838894]'>We'd love to here for you, please fill out this form.</p>
            </div>

            <ContactUsForm />

        </div>
    )
}

export default ContactFormSection