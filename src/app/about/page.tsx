import React from 'react'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import foundingstory from '../assets/Images/FoundingStory.png'
import HighLightText from '@/components/core/Home/HighLightText'
import LearningGrid from '@/components/core/About/LearningGrid'
import ContactFormSection from '@/components/core/About/ContactFormSection'
import Statics from '@/components/core/About/Statics'
import Footer from '@/components/common/Footer'
import Image from 'next/image'

const About = () => {
    return (
        <div>

            <div className='flex flex-col items-center justify-center px-6 pt-20 lg:px-32 bg-richblack-800 gap-14'>

                <div className='flex flex-col items-center justify-center gap-6 lg:w-[900px] mx-auto'>
                    <p className='text-[#838894]'>About us</p>

                    <div className='flex flex-col items-center justify-center gap-4'>
                        <h1 className='text-4xl font-semibold lg:text-center text-richblack-5 font-inter'>Driving Innovation in Online Education for a <HighLightText text={'Brighter Future'} /></h1>

                        <p className='text-[#838894] text-base lg:text-center font-medium'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>
                </div>

                <div className='relative flex flex-col gap-6 translate-y-12 lg:flex-row'>
                    <Image src={aboutus1} alt="#" />
                    <Image src={aboutus2} alt="#" />
                    <Image src={aboutus3} alt="#" />
                </div>

            </div>

            <div className='px-6 py-20 border-b lg:px-32 mt-28 bg-richblack-900 border-richblack-500'>

                <p className='lg:text-4xl text-2xl lg:leading-[55px] leading-9 lg:text-center lg:w-[1200px] mx-auto text-richblack-100'>

                    "We are passionate about revolutionizing the way we learn. Our innovative platform
                    <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>
                        combines technology
                    </span>,
                    <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
                        expertise
                    </span>,
                    and community to create an
                    <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>
                        unparalleled educational experience
                    </span>."

                </p>

            </div>

            <div className='flex flex-col items-center justify-between gap-24 px-6 py-20 lg:flex-row lg:px-36 bg-richblack-900 '>

                <div className='flex flex-col gap-6 lg:w-[486px]'>
                    <h1 className='bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text font-semibold font-inter text-4xl'>Our Founding Story</h1>
                    <div className='flex flex-col gap-4 text-[#838894]'>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                </div>

                <div className='flex items-center justify-center lg:p-8 lg:w-[534px]'><Image src={foundingstory} alt="#" className='w-full' /></div>

            </div>

            <div className='flex flex-col items-center justify-between gap-24 px-6 py-20 border-b lg:flex-row lg:px-36 bg-richblack-900 '>

                <div className='flex flex-col justify-center gap-6'>
                    <h1 className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold font-inter text-4xl'>Our Vision</h1>
                    <p className='text-[#838894]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                <div className='flex flex-col justify-center gap-6'>
                    <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold font-inter text-4xl'>Our Mission</h1>
                    <p className='text-[#838894]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>

            </div>

            <Statics />

            <div className='px-6 py-20 lg:px-32 bg-richblack-900'>

                <LearningGrid />

            </div>

            <ContactFormSection />

            <Footer />

        </div>
    )
}

export default About