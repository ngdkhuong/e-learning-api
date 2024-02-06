import { InstructorInterface, SavedInstructorInterface } from '../../../types/instructorInterface';
import { InstructorDbInterface } from '../../../app/repositories/instructorDbRepository';
import { AuthServiceInterface } from '../../../app/services/authServiceInterface';
import { RefreshTokenDbInterface } from '@src/app/repositories/refreshTokenDBRepository';
import { UploadFileInterface } from '@src/types/common';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';

export const instructorRegister = async (
    instructor: InstructorInterface,
    files: Express.Multer.File[],
    instructorRepository: ReturnType<InstructorDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    cloudService: ReturnType<CloudServiceInterface>,
) => {};
