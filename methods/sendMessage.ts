import * as chat from "../types/chat";
import { connect } from "../db/db";
import { encryptMessage } from "./encryptMessage";

async function getPoolQueryData(message: chat.Message) {
  const db = await connect();
  const encrypted_message = await encryptMessage(message);
  return db.getConnection((err, connection) => {
    try {
      connection.query(
        `INSERT INTO messages (id, sender, receiver, contents, attachments) VALUES(?,?,?,?,?)`,
        [
          encrypted_message.id,
          encrypted_message.sender,
          encrypted_message.receiver,
          encrypted_message.contents,
          encrypted_message.attachments,
        ],
        (err: any, res: any) => {
          return res;
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  });
}

export async function sendMessage(message: chat.Message) {
  return await getPoolQueryData(message);
}
