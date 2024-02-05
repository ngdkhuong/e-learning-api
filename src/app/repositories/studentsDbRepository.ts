import { StudentRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { StudentUpdateInfo } from '@src/types/studentInterface';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';

export const studentDbRepository = (repository: ReturnType<StudentRepositoryMongoDB>) => {
    const addStudent = async (student: StudentRegisterInterface) => await repository.addStudent(student);

    const getStudentByEmail = async (email: string) => await repository.getStudentByEmail(email);

    const getStudent = async (id: string) => await repository.getStudent(id);

    const changePassword = async (id: string, password: string) => await repository.changePassword(id, password);

    const updateProfile = async (id: string, studentInfo: StudentUpdateInfo) =>
        await repository.updateProfile(id, studentInfo);

    const getAllStudents = async () => await repository.getAllStudents();

    const blockStudent = async (id: string, reason: string) => await repository.blockStudent(id, reason);

    const unblockStudent = async (id: string) => await repository.unblockStudent(id);

    const getAllBlockedStudents = async () => await repository.getAllBlockedStudents();

    const getTotalNumberOfStudents = async () => await repository.getTotalNumberOfStudents();

    return {
        addStudent,
        getStudentByEmail,
        getStudent,
        changePassword,
        updateProfile,
        getAllStudents,
        blockStudent,
        unblockStudent,
        getAllBlockedStudents,
        getTotalNumberOfStudents,
    };
};

export type StudentDbInterface = typeof studentDbRepository;
