import * as chat from "../types/chat";
import { connect } from "../db/db";
import { encryptMessage } from "./encryptMessage";

export async function sendMessage(message: chat.Message) {
  const encrypted_message = await encryptMessage(message);
  const connection = await connect();
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO messages (id, sender, receiver, contents, attachments) VALUES(?,?,?,?,?)`,
      [encrypted_message.id, encrypted_message.sender, encrypted_message.receiver, encrypted_message.contents, encrypted_message.attachments],
      (err, res) => {
        if (err) reject(err);
        else resolve(JSON.stringify(res, null, 2));
      }
    );
    connection.end();
  });
}
