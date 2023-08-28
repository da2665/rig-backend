import * as chat from "../types/chat";
import { key, iv, algorithm } from "./encryptMessage";
import crypto from "crypto";

export async function decryptMessages(messages: chat.Message[]) {
  let decrypted_message: chat.Message;
  try {
    for (let x = 0; x >= messages.length; x++) {
      let encrypted_message = Buffer.from(messages[x].contents);
      let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
      let decrypted_contents = decipher.update(encrypted_message);
      decrypted_message = {
        id: messages[x].id,
        sender: messages[x].sender,
        receiver: messages[x].receiver,
        contents: decrypted_contents.toString(),
        attachments: messages[x].attachments,
      };
      console.log(decrypted_message);
      return decrypted_message;
    }
  } catch (err) {
    console.error(err);
  }
}
