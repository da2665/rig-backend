import * as chat from "../types/chat";
import crypto from "crypto";

export const algorithm: string = "aes-256-cbc";
export const key = crypto.randomBytes(32);
export const iv = crypto.randomBytes(16);

export async function encryptMessage(message: chat.Message): Promise<chat.Message> {
  return new Promise((resolve, reject) => {
    try {
      let message_contents: string = message.contents;
      let encrypted_message: chat.Message;
      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted_contents = cipher.update(message_contents);
      encrypted_contents = Buffer.concat([encrypted_contents, cipher.final()]);

      encrypted_message = {
        id: message.id,
        sender: message.sender,
        receiver: message.receiver,
        contents: encrypted_contents.toString('hex'),
        attachments: message.attachments,
      };
      resolve(encrypted_message as chat.Message);
    } catch (err) {
      reject(err);
    }
  });
}
