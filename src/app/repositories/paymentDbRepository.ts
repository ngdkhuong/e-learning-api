import { PaymentInfo } from '../../types/payment';
import { PaymentImplInterface } from '../../frameworks/database/mongodb/repositories/paymentRepoMongoDb';

export const PaymentInterface = (repository: ReturnType<PaymentImplInterface>) => {
    const savePayment = async (paymentInfo: PaymentInfo) => await repository.savePaymentInfo(paymentInfo);

    const getMonthlyRevenue = async () => await repository.getMonthlyRevenue();

    const getRevenueForEachMonth = async () => await repository.getRevenueForEachMonth();

    const getCoursesEnrolledPerMonth = async () => await repository.getCoursesEnrolledPerMonth();

    return {
        savePayment,
        getMonthlyRevenue,
        getRevenueForEachMonth,
        getCoursesEnrolledPerMonth,
    };
};

export type PaymentInterface = typeof PaymentInterface;
