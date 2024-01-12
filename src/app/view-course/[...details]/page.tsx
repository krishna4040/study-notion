import React from 'react'

const page = ({ params }: { params: { details: string[] } }) => {

    const { details } = params;
    let courseId = null;
    let sectionId = null;
    let subsectionId = null;
    for (let i = 0; i < details.length; i += 2) {
        const key = details[i];
        const value = details[i + 1];
        if (key === 'courseId') {
            courseId = value;
        } else if (key === 'sectionId') {
            sectionId = value;
        } else if (key === 'subSectionId') {
            subsectionId = value;
        }
    }

    return (
        <div>page</div>
    )
}

export default page