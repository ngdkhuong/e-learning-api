import { StudentDbInterface } from '../../../app/repositories/studentDbRepository';
import { CloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { StudentInterface } from '../../../types/studentInterface';
import AppError from './../../../utils/appError';
import HttpStatusCodes from './../../../constants/HttpStatusCodes';

export const getAllStudentsU = async (
    cloudService: ReturnType<CloudServiceInterface>,
    studentRepository: ReturnType<StudentDbInterface>,
) => {
    const students: StudentInterface[] | null = await studentRepository.getAllStudents();
    await Promise.all(
        students.map(async (student) => {
            if (student?.profilePic?.key) {
                student.profileUrl = '';
                student.profileUrl = await cloudService.getFile(student.profilePic.key);
            }
        }),
    );
    return students;
};

export const blockStudentU = async (
    studentId: string,
    reason: string,
    studentRepository: ReturnType<StudentDbInterface>,
) => {
    if (!studentId) {
        throw new AppError('Invalid student details', HttpStatusCodes.BAD_REQUEST);
    }
    if (!reason) {
        throw new AppError('Please give a reason to block a student', HttpStatusCodes.BAD_REQUEST);
    }
    const student = await studentRepository.getStudent(studentId);

    if (student?.isBlocked) {
        throw new AppError('Already blocked this student', HttpStatusCodes.CONFLICT);
    }

    await studentRepository.blockStudent(studentId, reason);
};

export const unblockStudentU = async (studentId: string, studentRepository: ReturnType<StudentDbInterface>) => {
    if (!studentId) {
        throw new AppError('Invalid student details', HttpStatusCodes.BAD_REQUEST);
    }
    await studentRepository.unblockStudent(studentId);
};

export const getAllBlockedStudentsU = async (
    cloudService: ReturnType<CloudServiceInterface>,
    studentRepository: ReturnType<StudentDbInterface>,
) => {
    const blockedStudents: StudentInterface[] | null = await studentRepository.getAllBlockedStudents();
    await Promise.all(
        blockedStudents.map(async (student) => {
            if (student?.profilePic?.key) {
                student.profileUrl = '';
                student.profileUrl = await cloudService.getFile(student.profilePic.key);
            }
        }),
    );
    return blockedStudents;
};
