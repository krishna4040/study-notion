export { }
import express from 'express'
const router = express.Router()

// Course
import { createCourse, editCourse, getAllCourses, getCourseDetails, getInstructorCourses } from '../controllers/course'

// Categories
import { categoryPageDetails, createCategory, showAllCategories } from '../controllers/category'

// Sections
import { createSection, deleteSection, updateSection } from '../controllers/section'

// Sub-Sections
import { createSubSection, deleteSubSection, updateSubSection } from '../controllers/subSection'

// Rating
import { createRating, getAllRatingReview, getAverageRating } from '../controllers/ratingAndReview'

// Middlewares
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth"
import { updateCourseProgress } from '../controllers/courseProgress'

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// Edit course
router.put("/editCourse", auth, isInstructor, editCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails/:courseId", getCourseDetails)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// update courseProgress
router.put("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/getCategoryPageDetails/:categoryName", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating/:courseId", getAverageRating)
router.get("/getReviews", getAllRatingReview);

export default router