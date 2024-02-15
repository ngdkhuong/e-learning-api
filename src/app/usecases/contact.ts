import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { ContactDbInterface } from '../repositories/contactRepoInterface';
import { ContactInterface } from './../../types/contact';
import AppError from './../../utils/appError';

export const addContactU = async (
    contactInfo: ContactInterface,
    contactDbRepository: ReturnType<ContactDbInterface>,
) => {
    if (!contactInfo) {
        throw new AppError('Please provide valid data', HttpStatusCodes.BAD_REQUEST);
    }
    await contactDbRepository.addContact(contactInfo);
};
