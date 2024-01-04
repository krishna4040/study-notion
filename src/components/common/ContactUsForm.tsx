'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios'
import { contactusEndpoint } from '@/services/api'
import CountryCode from '../../data/countrycode.json'

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        phone: "",
        message: ""
    });

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => {
            return { ...prev, [event.target.name]: event.target.value }
        });
    }

    const sumbitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(contactusEndpoint.CONTACT_US_API, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            console.log("error while sumbitting form", error);
        }
    }

    return (
        <form onSubmit={sumbitHandler} className='flex flex-col items-center justify-center p-8 gap-9'>

            <div>

                <div className='flex flex-col gap-5 lg:flex-row'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="firstName" className='text-[#F1F2FF] font-inter text-sm'>First Name</label>
                        <input
                            className='form-style'
                            type="text"
                            placeholder='Enter First Name'
                            name='firstName'
                            value={formData.firstName}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="lastName" className='text-[#F1F2FF] font-inter text-sm'>Last Name</label>
                        <input
                            className='form-style'
                            type="text"
                            placeholder='Enter Last Name'
                            name='lastName'
                            value={formData.lastName}
                            onChange={changeHandler}
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="email" className='text-[#F1F2FF] font-inter text-sm'>Email Address</label>
                    <input
                        className='form-style'
                        type="text"
                        placeholder='Enter Your Email'
                        name='email'
                        value={formData.email}
                        onChange={changeHandler}
                    />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="phone" className='text-[#F1F2FF] font-inter text-sm'>Phone Number</label>
                    <div className='flex items-center gap-5'>
                        <div className='flex items-center justify-center'>
                            <select
                                name='countryCode'
                                value={formData.countryCode}
                                onChange={changeHandler}
                                className='w-[76.5px] form-style'>
                                {
                                    CountryCode.map((element, index) => {
                                        return <option value={element.code} key={index}>{element.code}-{element.country}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='w-full'>
                            <input
                                className='w-full form-style'
                                type="text"
                                placeholder='12345 67890'
                                name='phone'
                                value={formData.phone}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center gap-2 mt-3'>
                    <label htmlFor="message" className='text-[#F1F2FF] font-inter text-sm'>Message</label>
                    <textarea
                        className='form-style'
                        cols={30}
                        rows={7}
                        placeholder='Enter Your Message here'
                        name='message'
                        value={formData.message}
                        onChange={changeHandler}
                    >
                    </textarea>
                </div>

                <button type='submit' className='hover:scale-95 transition-all duration-200 rounded-lg p-3 text-center mt-6 bg-[#FFD60A] w-full text-[#000814] font-semibold font-inter'>Send Message</button>

            </div>

        </form>
    )
}

export default ContactUsForm