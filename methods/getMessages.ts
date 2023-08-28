import { connect } from "../db/db";
import { decryptMessages } from "./decryptMessages";
import * as chat from "../types/chat";

export async function getMessages(): Promise<chat.Message[]> {
  const connection = await connect();
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * from messages`,
      async (err: any, res: chat.Message[]) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
    connection.end();
  });
}
