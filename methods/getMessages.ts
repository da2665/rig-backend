import * as chat from "../types/chat";
import { decryptMessages } from "./decryptMessages";
import { connect } from "../db/db";

export async function getMessages() {
  const connection = await connect();
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from messages`, async (err: any, res: chat.Message[]) => {
      if (err) reject(err);
      else resolve(await decryptMessages(res as chat.Message[]));
    });
    connection.end();
  })
}
