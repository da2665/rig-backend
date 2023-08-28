import * as chat from "../types/chat";
import { connect } from "../db/db";
import { encryptMessage } from "./encryptMessage";

export async function sendMessage(message: chat.Message) {
  const connection = await connect();
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO messages (id, sender, receiver, contents, attachments) VALUES ?`,
      [
        message.id,
        message.sender,
        message.receiver,
        message.contents,
        message.attachments,
      ],
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
        connection.end();
      }
    );
  });
}
