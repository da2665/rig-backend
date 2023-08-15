import mysql from "mysql2";
import { getSecret } from "./getSecret";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
    const secret = await getSecret();

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: secret.secret,
        database: process.env.DB_NAME
    }

    const connection = mysql.createConnection(config);
    return connection;
}
