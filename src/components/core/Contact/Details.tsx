import React from 'react'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { BsGlobeEuropeAfrica } from 'react-icons/bs'
import { IoCall } from 'react-icons/io5'

const detailsarr = [
    { icon: HiChatBubbleLeftRight, title: "Chat on us", desc1: "Our friendly team is here to help", desc2: " @mail address" },
    { icon: BsGlobeEuropeAfrica, title: "Visit us", desc1: "Come and say hello at our office HQ", desc2: "Here is the location/ address" },
    { icon: IoCall, title: "Call us", desc1: "Mon - Fri From 8am to 5pm", desc2: "+123 456 7890" }
]

const Details = () => {
    return (
        <div className='flex flex-col justify-center gap-6 lg:p-6 px-9 py-3 rounded-xl lg:w-[450px] w-full mx-auto bg-[#161D29]'>
            {
                detailsarr.map((element, index) => {
                    return (
                        <div>
                            <div className='relative flex flex-col gap-2 mx-auto w-[300px]' key={index}>
                                <h2 className='text-lg text-[#F1F2FF] font-inter font-semibold'>{element.title}</h2>
                                <p className=' text-sm text-[#999DAA] font-inter font-medium'>{element.desc1}</p>
                                <p className=' text-sm text-[#999DAA] font-inter font-medium'>{element.desc2}</p>
                                <span className='absolute top-1 lg:-left-9 -left-7'><element.icon className='text-[#AFB2BF] text-xl' /></span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Details