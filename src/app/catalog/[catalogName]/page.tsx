import axios from 'axios'
import React from 'react'
import { course, category } from '@/lib/types';
import Footer from '@/components/common/Footer'
import CourseCard from '@/components/core/Catalouge/CourseCard';
import CourseSlider from '@/components/core/Catalouge/CourseSlider'

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
        <div className='text-white'>

            <div>
                <p>Home / Catalog / <span>{selectedCategory.name}</span></p>
                <p>{selectedCategory.name}</p>
                <p>{selectedCategory.description}</p>
            </div>

            <div>

                <div>
                    <div>Courses To Get You Started</div>
                    <div>
                        <p>Most popular</p>
                        <p>New</p>
                    </div>
                    <CourseSlider courses={selectedCategory.courses} />
                </div>

                <div>
                    <p>Top Courses</p>
                    <CourseSlider courses={differentCourses} />
                </div>

                <div>
                    <div>Frequently Brought</div>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2'>
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