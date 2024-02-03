export interface JwtPayload {
    Id: string;
    email: string;
    role: string;
}

export interface UploadFileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    path: string;
    size: number;
    filename: string;
}
