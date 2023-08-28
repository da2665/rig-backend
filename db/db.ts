import { createPool, Pool } from "mysql2";
import { getSecret } from "./getSecret";
import dotenv from "dotenv";

dotenv.config();

let globalPool: Pool | undefined = undefined;

export async function connect(): Promise<Pool> {
    const secret = await getSecret();

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: secret.secret,
        database: process.env.DB_NAME,
    }

    globalPool = createPool(config);

    return globalPool;
}
