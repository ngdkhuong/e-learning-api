import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import { PaymentInterface } from '../../../app/repositories/paymentDbRepository';
import { PaymentInfo } from '../../../types/payment';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';

export const addCourses = async (
    courseId: string,
    studentId: string | undefined,
    paymentInfo: any,
    courseDbRepository: ReturnType<CourseDbRepositoryInterface>,
    paymentDbRepository: ReturnType<PaymentInterface>,
) => {
    if ()
};
