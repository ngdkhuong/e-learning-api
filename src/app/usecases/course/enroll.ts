import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import { PaymentInterface } from '../../../app/repositories/paymentDbRepository';
import { PaymentInfo } from '../../../types/payment';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';

export const enrollStudentU = async (
    courseId: string,
    studentId: string | undefined,
    paymentInfo: any,
    courseDbRepository: ReturnType<CourseDbRepositoryInterface>,
    paymentDbRepository: ReturnType<PaymentInterface>,
) => {
    if (!courseId) {
        throw new AppError('Please provide course details', HttpStatusCodes.BAD_REQUEST);
    }

    if (!studentId) {
        throw new AppError('Please provide student details', HttpStatusCodes.BAD_REQUEST);
    }

    const course = await courseDbRepository.getCourseById(courseId);

    if (course?.isPaid) {
        const payment = {
            courseId: courseId,
            studentId: studentId,
            paymentId: paymentInfo.id,
            amount: paymentInfo.amount / 10,
            currency: paymentInfo.currency,
            payment_method: paymentInfo.payment_method,
            status: paymentInfo.status,
        };
        await Promise.all([
            courseDbRepository.enrollStudent(courseId, studentId),
            paymentDbRepository.savePayment(payment),
        ]);
    } else {
        await courseDbRepository.enrollStudent(courseId, studentId);
    }
};
