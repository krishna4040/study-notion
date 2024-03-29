import { Request, Response } from 'express'
import Category from '../models/Category'
import { course } from '../models/Course'

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            throw new Error('Invalid req');
        }
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        return res.status(200).json({
            success: true,
            message: "Categories Created Successfully",
            data: CategoryDetails
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
            message: 'Categories fetched',
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
        const { categoryName } = req.params;
        const selectedCategory = await Category.findOne({ name: categoryName }).populate("courses").exec();
        if (!selectedCategory) {
            throw new Error('Category not found');
        }
        if (!selectedCategory.courses.length) {
            throw new Error('No courses for selected category');
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({ name: { $ne: categoryName } }).populate("courses");
        let differentCourses = [];
        for (const category of categoriesExceptSelected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find({}).populate<{ courses: course[] }>("courses");
        const allCourses = allCategories.flatMap(category => category.courses);
        const mostSellingCourses = allCourses.sort((a, b) => b.sold! - a.sold!).slice(0, 10);

        res.status(200).json({
            success: true,
            message: 'req data fetched',
            data: {
                selectedCourses: selectedCategory,
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