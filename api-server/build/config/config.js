import dotenv from 'dotenv';
dotenv.config();
;
export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    environment: process.env.DEVELOPMENT ? process.env.development : ''
};
