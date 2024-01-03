import { Request, Response } from 'express'
import Category from '../models/Category'

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            throw new Error('Invalid req');
        }
        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        });
        return res.status(200).json({
            success: true,
            message: "Categories Created Successfully",
            data: CategorysDetails
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const showAllCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await Category.find({});
        res.status(200).json({
            success: true,
            message: 'Categories fecthed',
            data: allCategories,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const categoryPageDetails = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.body;
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        if (!selectedCategory) {
            console.log("Category not found.");
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }
        if (!selectedCategory.courses.length) {
            throw new Error('No courses for selected category');
        }

        const selectedCourses = selectedCategory.courses;

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } }).populate("courses");
        let differentCourses = [];
        for (const category of categoriesExceptSelected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find({}).populate("courses");
        const allCourses = allCategories.flatMap(category => category.courses);
        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

        res.status(200).json({
            success: true,
            message: 'req data fecthed',
            data: {
                selectedCourses: selectedCourses,
                differentCourses: differentCourses,
                mostSellingCourses: mostSellingCourses,
            }
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};