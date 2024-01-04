'use client'
import React, { useState } from 'react'
import { HomePageExplore } from "@/data/homepage-explore"
import HighLightText from './HighLightText'
import CourseCard from './CourseCard'

const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currTab, setCurrTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currCard, setCurrCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (val: string) => {
        setCurrTab(val);
        const result = HomePageExplore.filter((course) => course.tag === val);
        setCourses(result[0].courses);
        setCurrCard(result[0].courses[0].heading);
    }

    return (
        <div>

            <div className='text-4xl font-semibold lg:text-center'>
                Unlock the
                <HighLightText text={'Power of code'} />
            </div>

            <p className='mt-3 text-base lg:text-center text-richblack-300'>
                Learn to build anything you can imagine
            </p>

            <div className='items-center justify-center hidden gap-3 px-3 py-3 mx-auto my-5 rounded-full w-fit lg:flex bg-richblack-800 border-richblack-100'>
                {tabs.map((ele, index) => {
                    return (
                        <div
                            className={` text-[16px] flex flex-row items-center gap-2 ${currTab === ele
                                ? "bg-richblack-900 text-richblack-5 font-medium"
                                : "text-richblack-200"
                                } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                            key={index}
                            onClick={() => setMyCards(ele)}>
                            {ele}
                        </div>
                    );
                })}
            </div>

            <div className='relative flex flex-col items-center justify-between gap-8 lg:flex-row -bottom-16'>

                {
                    courses.map((element, index) => {
                        return <CourseCard
                            key={index}
                            cardData={element}
                            currentCard={currCard}
                            setCurrentCard={setCurrCard}
                        />
                    })
                }

            </div>

        </div>
    )
}

export default ExploreMore