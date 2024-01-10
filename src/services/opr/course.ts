import { toast } from "react-hot-toast"
import axios from 'axios'
import { courseEndpoints } from "../api"

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await axios.get(GET_ALL_COURSE_API);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data;
    } catch (error: any) {
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseDetails = async (courseId: string, token: string) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await axios.get(`${COURSE_DETAILS_API}/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data;
    } catch (error: any) {
        result = error.message
    }
    toast.dismiss(toastId)
    return result
}

export const fetchInstructorCourses = async (token: string) => {
    const toastId = toast.loading("Loading...");
    let res = null;
    try {
        const { data } = await axios.get(GET_ALL_INSTRUCTOR_COURSES_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res = data.data;
    } catch (error) {
        res = error;
    }
    toast.dismiss(toastId);
    return res;
}

// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await axios.get(COURSE_CATEGORIES_API);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    } catch (error: any) {
        toast.error(error.message);
    }
    return result;
}

// add the course details
export const addCourseDetails = async (data: FormData, imageFile: File, token: string) => {
    // result has schema of course
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(CREATE_COURSE_API, {
            ...data,
            courseImage: imageFile
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    } catch (error: any) {
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result;
}

// edit the course details
export const editCourseDetails = async (data: FormData, token: string, imageFile: File | null = null) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const postData = imageFile ? { ...imageFile, data } : data;
        const response = await axios.post(EDIT_COURSE_API, postData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details");
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error: any) {
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// create a section
export const createSection = async (data: any, token: string) => {
    // res is of type course
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(CREATE_SECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section");
        }
        toast.success("Course Section Created");
        result = response?.data?.data;
    } catch (error: any) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create a subsection
export const createSubSection = async (data: any, videoFile: File, token: string) => {
    // res have schema of section
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(CREATE_SUBSECTION_API, {
            ...data,
            videoUrl: videoFile
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added");
        result = response?.data?.data;
    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update a section
export const updateSection = async (data: any, token: string) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(UPDATE_SECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section");
        }
        toast.success("Course Section Updated")
        result = response?.data?.data;
    } catch (error: any) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update a subsection
export const updateSubSection = async (data: any, token: string) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(UPDATE_SUBSECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
        toast.success("Lecture Updated");
        result = response?.data?.data;
    } catch (error: any) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete a section
export const deleteSection = async (data: any, token: string) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(DELETE_SECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }
        toast.success("Course Section Deleted");
        result = response?.data?.data;
    } catch (error: any) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete a subsection
export const deleteSubSection = async (data: any, token: string) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(DELETE_SUBSECTION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture");
        }
        toast.success("Lecture Deleted");
        result = response?.data?.data;
    } catch (error: any) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete a course
export const deleteCourse = async (data: any, token: string) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.delete(DELETE_COURSE_API, data);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course")
        }
        toast.success("Course Deleted");
    } catch (error: any) {
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

// mark a lecture as complete
export const markLectureAsComplete = async (data: any, token: string) => {
    let result = null;
    console.log("mark complete data", data);
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(LECTURE_COMPLETION_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Lecture Completed");
        result = true;
    } catch (error: any) {
        toast.error(error.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}

// create a rating for course
export const createRating = async (data: any, token: string) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
        const response = await axios.post(CREATE_RATING_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating");
        }
        toast.success("Rating Created");
        success = true;
    } catch (error: any) {
        success = false;
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;
}
