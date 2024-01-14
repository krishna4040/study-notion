'use client'
import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { course } from '@/lib/types';

Chart.register(...registerables);

const InstructorChart = ({ courses }: { courses: course[] }) => {

    const [currChart, setCurrChart] = useState('students');

    const generateRandomColors = (n: number) => {
        let colors = [];
        for (let i = 0; i < n; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
            colors.push(color);
        }
        return colors;
    }

    const calculateTotalStudentsEnrolled = (course: course) => { }
    const calculateTotalAmountGenerated = (course: course) => { }

    const chartDataForStudents = {
        labels: courses.map(course => course.courseName),
        datasets: [
            {
                data: courses.map(course => calculateTotalStudentsEnrolled(course)),
                backgroundColor: generateRandomColors(courses.length)
            }
        ]
    }

    const chartDataForIncome = {
        labels: courses.map(course => course.courseName),
        datasets: [
            {
                data: courses.map(course => calculateTotalAmountGenerated(course)),
                backgroundColor: generateRandomColors(courses.length)
            }
        ]
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Visualize</p>
            <div className="space-x-4 font-semibold">
                <button onClick={() => { setCurrChart("students") }} className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"}`}>
                    Student
                </button>
                <button className={`rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"}`} onClick={() => { setCurrChart("Income") }}>
                    Income
                </button>
            </div>
            <div className="relative mx-auto aspect-square h-full w-full">
                <Pie
                    data={currChart == "students" ? chartDataForStudents : chartDataForIncome}
                />
            </div>
        </div>
    )
}

export default InstructorChart