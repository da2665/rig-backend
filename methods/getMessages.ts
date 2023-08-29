import { connect } from "../db/db";
import { decryptMessages } from "./decryptMessages";
import * as chat from "../types/chat";

export async function getMessages() {
  const connection = await connect();
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from messages`,
      async (err: any, res: any) => {
        if (err) reject(err);
        else resolve(JSON.stringify(res));
      }
    );
    connection.end();
  });
}
