import axios from 'axios'
import React from 'react'

const page = ({ params }: { params: { catalougeName: string } }) => {

    const getCatalogPageData = async () => { }

    const { catalougeName } = params;
    const catalougePageData = getCatalogPageData();

    return (
        <div className='text-white'>
            <div>
                <p>Home / Catalouge / {catalougeName}</p>
                <p></p>
                <p></p>
            </div>
            <div>

                <div>
                    <div>
                        <p>Most popular</p>
                        <p>New</p>
                    </div>
                    {/* <CourseSlider /> */}
                </div>

                <div>
                    <p>Top Courses</p>
                    {/* <CourseSlider /> */}
                </div>

                <div>
                    <p>Frequently Brought</p>
                </div>

            </div>

            <footer>

            </footer>

        </div>
    )
}

export default page 