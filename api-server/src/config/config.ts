import dotenv from 'dotenv'
dotenv.config();

interface Env {
    port?: number,
    environment?: string
};

export const config: Env = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    environment: process.env.DEVELOPMENT ? process.env.development : ''
}