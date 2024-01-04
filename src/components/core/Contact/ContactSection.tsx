import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactSection = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-5 py-5 w-full lg:w-fit px-8 lg:gap-8 lg:p-14 rounded-xl border border-[#424854]'>

            <div className='flex flex-col justify-center gap-3'>
                <h1 className='text-[#F1F2FF] font-inter font-semibold text-4xl'>Got a Idea? We’ve got the skills. <br /> Let’s team up</h1>

                <p className='font-medium font-inter text-[#838894]'>Tall us more about yourself and what you’re got in mind.</p>
            </div>

            <ContactUsForm />

        </div>
    )
}

export default ContactSection