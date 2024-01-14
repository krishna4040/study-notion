import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

import HighLightText from '../components/core/Home/HighLightText'
import Button from '../components/core/Home/Button'
import CodeBlocks from '../components/core/Home/CodeBlocks'
import TimeLineSection from '../components/core/Home/TimeLineSection'
import LearningLanguageSection from '../components/core/Home/LearningLanguageSection'
import InstructorSection from '../components/core/Home/InstructorSection'
import ExploreMore from '../components/core/Home/ExploreMore'
import Footer from '../components/common/Footer'
import ReviewSlider from '@/components/common/ReviewSlide'

export default function Home() {
  return (
    <div>

      {/* Section1 */}
      <div className='relative flex flex-col items-center justify-between w-11/12 mx-auto text-white max-w-maxContent'>

        <Link href='/signup'>
          <div className='p-1 mx-auto mt-10 font-bold transition-all duration-200 rounded-full lg:mt-14 w-fit bg-richblack-800 text-richblack-200 hover:scale-95 group'>
            <div className='flex items-center gap-2 px-10 py-1 transition-all duration-200 rounded-full group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='mt-8 text-4xl font-semibold lg:text-center'>
          Empower Your Future with
          <HighLightText text='Coding Skills' />
        </div>

        <div className='lg:w-[90%] lg:text-center mt-4 text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className='flex mt-8 gap-7'>
          <Button text='Learn a Demo' active={true} linkto={'/signup'} />
          <Button text='Book a Demo' active={false} linkto={'/login'} />
        </div>

        <div className='mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
          <video src='/banner.mp4' muted loop autoPlay className="lg:shadow-[20px_20px_rgba(255,255,255)] shadow-[10px_10px_rgba(255,255,255)]"></video>
        </div>

        <div>
          <CodeBlocks
            position={'lg:flex-row flex-col'}
            heading="Unlock your"
            highlight='Coding potential'
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            btn1={{
              text: 'Try it yourself',
              linkto: '/signup',
              active: true,
              arrow: true
            }}
            btn2={{
              text: 'Learn more',
              linkto: '/login',
              active: false
            }}
            codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n</nav>\n</body>`}
            codeColor={'text-yellow-25'}
            backgroundGradient={<div className="absolute codeblock1"></div>}
          />
        </div>

        <div className='-mt-10'>
          <CodeBlocks
            position={'lg:flex-row-reverse flex-col'}
            heading="Start"
            highlight='Coding in seconds'
            subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            btn1={{
              text: 'Continue lesson',
              linkto: '/signup',
              active: true,
              arrow: true
            }}
            btn2={{
              text: 'Learn more',
              linkto: '/login',
              active: false
            }}
            codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={'text-white'}
            backgroundGradient={<div className="absolute codeblock2"></div>}
          />
        </div>

        <ExploreMore />

      </div>

      {/* Section2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>

        <div className='homepage_bg h-80'>

          <div className='flex items-center w-11/12 gap-5 mx-auto max-w-maxContent'>

            <div className='flex items-center justify-between mx-auto text-white mt-36 gap-7'>

              <Button active={true} linkto={'/signup'} text={'Explore full Catalog'} arrow={true} />

              <Button active={false} linkto={'/login'} text={'Learn more'} />

            </div>

          </div>

        </div>

        <div className='flex flex-col items-center justify-between w-11/12 mx-auto max-w-maxContent gap-7'>

          <div className="flex flex-col gap-5 mt-24 mb-10 lg:flex-row">

            <div className='text-4xl font-semibold lg:w-[45%]'>
              Get The Skills you need for a
              <HighLightText text='Job is in demand' />
            </div>

            <div className='font-semibold flex flex-col gap-10 lg:w-[40%] items-start'>
              <p className='text-lg'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
              <Button text={'Learn more'} active={true} linkto={'/signup'} />
            </div>

          </div>

          <TimeLineSection />

          <LearningLanguageSection />

        </div>

      </div>

      {/* Section3 */}
      <div className='flex flex-col items-center justify-between w-11/12 gap-8 mx-auto text-white max-w-maxContent bg-richblack-900'>

        <InstructorSection />

        <h2 className='text-4xl font-semibold lg:mt-10 mt-7 lg:text-center'>Review from other learners</h2>
        <ReviewSlider />

      </div>

      {/* Section4-- footer */}
      <Footer />

    </div>
  )
}