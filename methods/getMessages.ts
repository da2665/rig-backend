import { decryptMessages } from "./decryptMessages";
import { connect } from "../db/db";

let globalPool: any;

async function getPoolQueryData() {
  await connect().then((pool) => {
    globalPool = pool;
  });

  if (!globalPool) {
    throw new Error("Connection pool not initialized");
  }
  const connection = await globalPool.getConnection();
  try {
    const result = connection.query(`SELECT * from messages`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function getMessages() {
  return await getPoolQueryData();
}
