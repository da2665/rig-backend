import * as chat from "../types/chat";
import { key, iv, algorithm } from "./encryptMessage";
import crypto from "crypto";

export async function decryptMessages(messages: chat.Message[]): Promise<chat.Message[]> {
  return new Promise((resolve, reject) => {
    try {
      let decrypted_messages: chat.Message[] = [];
      for (let x = 0; x >= messages.length; x++) {
        let encrypted_message = Buffer.from(messages[x].contents);
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted_contents = decipher.update(encrypted_message);
        decrypted_messages.push({
          id: messages[x].id,
          sender: messages[x].sender,
          receiver: messages[x].receiver,
          contents: decrypted_contents.toString(),
          attachments: messages[x].attachments,
        });
      }
      resolve(decrypted_messages);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}
