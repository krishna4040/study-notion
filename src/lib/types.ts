export interface course {
    _id: string;
    courseName: string;
    courseDescription: string;
    instructor: user;
    whatYouWillLearn: string;
    courseContent: section[];
    ratingAndReviews: RatingAndReview[];
    price: number;
    thumbnail: string;
    tag: string[];
    category: category;
    studentsEnrolled: user[];
    instructions: string[];
    status: 'Draft' | 'Published';
    sold: number,
    totalDuration: string,
    progressPercentage: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface category {
    _id: string;
    name: string;
    description: string;
    courses: [course];
}

export interface courseProgress {
    _id: string;
    courseID: course,
    completedVideos: subSection[]
}

export interface OTP {
    _id: string;
    email: string,
    otp: string,
    createdAt: Date
}

export interface Profile {
    _id: string;
    gender?: string;
    dateOfBirth?: string;
    about?: string;
    contactNumber?: number;
}

export interface RatingAndReview {
    _id: string;
    user: user;
    rating: number;
    review: string;
    course: user;
}

export interface section {
    _id: string;
    sectionName: string;
    subSection: Array<subSection>
}

export interface subSection {
    _id: string;
    title: string,
    timeDuration: string,
    description: string,
    videoUrl: string
}

export interface user {
    _id: string;
    firstName: string,
    lastName: string,
    email: string,
    password: string | undefined,
    accountType: "Admin" | "Student" | "Instructor",
    active: boolean,
    approved: boolean,
    additionalDetails: Profile,
    courses: [course],
    token: string,
    resetPasswordExpires: Date,
    image: string,
    courseProgress: [courseProgress],
    createdAt: Date;
    updatedAt: Date;
    cart: course[];
}