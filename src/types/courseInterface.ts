import { Question } from './lesson';

interface fileSchema {
    key: string;
    name: string;
    url?: string;
}

export interface AddCourseInfoInterface {
    title: string;
    duration: number;
    category: string;
    level: string;
    tags: string[] | string;
    price: number;
    isPaid: boolean;
    about: string;
    description: string;
    syllabus: string[] | string;
    requirements: string[] | string;
    thumbnail: fileSchema;
    introduction: fileSchema;
    guidelines: fileSchema;
    instructorId: string;
    rating: number;
    isVerified: boolean;
}

export interface CourseInterface extends AddCourseInfoInterface {
    coursesEnrolled: Array<string>;
    thumbnailUrl: string;
    introductionUrl: string;
    guidelinesUrl: string;
}

export interface AddQuizInfoInterface {
    courseId: string;
    lessonId: string;
    questions: Question[];
}

export interface EditQuizInfoInterface {
    courseId?: string;
    lessonId?: string;
    questions: Question[];
}

export interface EditCourseInfo {
    title?: string;
    duration?: number;
    category?: string;
    tags?: string[] | string;
    price?: number;
    isPaid?: boolean;
    about?: string;
    description?: string;
    syllabus?: string[] | string;
    requirements?: string[] | string;
    thumbnail?: fileSchema;
    introductionVideo?: fileSchema;
    guidelines?: fileSchema;
    instructorId?: string;
    rating?: number;
    isVerified?: boolean;
    enrollmentCount?: number;
    quiz?: AddQuizInfoInterface;
    enrollmentLimit?: number;
    completionStatus?: number;
}
