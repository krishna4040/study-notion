import axios from 'axios'
import React from 'react'
import { course, category } from '@/lib/types';
import Footer from '@/components/common/Footer'
import CourseCard from '@/components/core/Catalouge/CourseCard';
import CourseSlider from '@/components/core/Catalouge/CourseSlider'
import Tab from '@/components/core/Catalouge/Tab'

const getCatalogPageData = async (categoryName: string) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/course/getCategoryPageDetails/${categoryName}`);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const page = async ({ params }: { params: { catalogName: string } }) => {

    const { catalogName } = params;
    const catalogPageData = await getCatalogPageData(catalogName);

    if (!catalogPageData) {
        return <div>Error fetching catalog page data</div>;
    }

    const selectedCategory: category = catalogPageData.selectedCourses;
    const differentCourses: course[] = catalogPageData.differentCourses;
    const mostSellingCourses: course[] = catalogPageData.mostSellingCourses;

    return (
        <div className='box-content bg-richblack-800 px-4'>

            <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent '>
                <p className='text-sm text-richblack-300'>Home / Catalog / <span className='text-yellow-25'>{selectedCategory.name}</span></p>
                <p className='text-3xl text-richblack-5'>{selectedCategory.name}</p>
                <p className="max-w-[870px] text-richblack-200">{selectedCategory.description}</p>
            </div>

            <div className="box-content w-full px-4 py-12 mx-auto  max-w-maxContentTab lg:max-w-maxContent">

                <div className="section_heading">
                    <div>Courses To Get You Started</div>
                    <Tab />
                    <CourseSlider courses={selectedCategory.courses} />
                </div>

                <div className="box-content w-full px-4 py-12 mx-auto max-w-maxContentTab lg:max-w-maxContent">
                    <p className="section_heading">Top Courses</p>
                    <div className='py-8'><CourseSlider courses={differentCourses} /></div>
                </div>

                <div className="box-content w-full px-4 py-12 mx-auto max-w-maxContentTab lg:max-w-maxContent">
                    <div className="section_heading">Frequently Brought</div>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            {
                                mostSellingCourses.slice(0, 4).map((course, idx) => {
                                    return <CourseCard key={idx} course={course} />
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>

            <Footer />

        </div>
    )
}

export default page 