import { StudentInterface } from '../../../../types/studentInterface';
import Student from '../models/student';
import mongoose from 'mongoose';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';

export const studentRepositoryMongoDB = () => {
    const addStudent = async (student: StudentRegisterInterface) => {
        const newStudent = new Student(student);
        return await newStudent.save();
    };

    const getStudentByEmail = async (email: string) => {
        const user: StudentInterface | null = await Student.findOne({ email });
        return user;
    };

    const getStudent = async;
};
