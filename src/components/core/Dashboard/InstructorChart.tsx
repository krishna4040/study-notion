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
        <div>
            <p>Visualize</p>
            <div>
                <button onClick={() => { setCurrChart("students") }}>Student</button>
                <button onClick={() => { setCurrChart("Income") }}>Income</button>
            </div>
            <div>
                <Pie
                    data={currChart == "students" ? chartDataForStudents : chartDataForIncome}
                />
            </div>
        </div>
    )
}

export default InstructorChart