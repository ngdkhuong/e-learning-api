import Contact from '../models/contact';
import { ContactInterface } from '@src/types/contact';

export const contactRepositoryMongoDb = () => {
    const addContact = async (contact: ContactInterface) => {
        const newContact = new Contact(contact);
        await newContact.save();
    };
    return {
        addContact,
    };
};

export type ContactRepoImpl = typeof contactRepositoryMongoDb;
