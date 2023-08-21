import * as chat from "../types/chat";
import crypto from "crypto";

export async function encryptMessage(message: chat.Message): Promise<chat.Message> {
  const algorithm: string = "aes-256-cbc";
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  return new Promise((resolve, reject) => {
    try {
      let encrypted_message: chat.Message;
      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted_contents = cipher.update(message.contents);
      encrypted_contents = Buffer.concat([encrypted_contents, cipher.final()]);

      encrypted_message = {
        id: message.id,
        sender: message.sender,
        receiver: message.receiver,
        contents: encrypted_contents.toString(),
        attachments: message.attachments,
      };
      resolve(encrypted_message);
    } catch (err) {
      reject(err);
    }
  });
}
