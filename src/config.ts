import dotenv from "dotenv";
dotenv.config();

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
    
    PORT: process.env.PORT,

    DB_NAME: process.env.DB_NAME,

    JWT_SECRET: process.env.JWT_SECRET as string,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

    NODE_ENV: process.env.NODE_ENV as string,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,

    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,

    ORIGIN_PORT: process.env.ORIGIN_PORT as string,

    EMAIL_NODE_MAILER: process.env.EMAIL_USERNAME as string,

    PASSWORD_NODE_MAILER: process.env.EMAIL_PASSWORD as string,

    FROM_EMAIL_NODE_MAILER: process.env.FROM_EMAIL as string,
}

export default configKeys