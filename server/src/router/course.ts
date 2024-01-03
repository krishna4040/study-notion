export { }
const express = require("express")
const router = express.Router()

// Course
import { createCourse, getAllCourses, getCourseDetails, getInstructorCourses } from '../controllers/course'

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

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails/:courseId", getCourseDetails)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", auth, isAdmin, showAllCategories)
router.post("/getCategoryPageDetails", auth, isAdmin, categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating/:courseId", getAverageRating)
// router.get("/getReviews", getAllRating)

export default router