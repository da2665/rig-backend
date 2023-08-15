import * as chat from "../types/chat";
import { connect } from "../db/db";

export async function sendMessage(message: chat.Message) {
  const connection = await connect();
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO messages (id, sender, receiver, contents) VALUES(?,?,?,?)`,
      [message.id, message.sender, message.receiver, message.contents],
      (err, res) => {
        if (err) reject(err);
        else resolve(JSON.stringify(res, null, 2));
      }
    );
  });
}
