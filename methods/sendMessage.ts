import * as rig from "../types";
import { connect } from "../db/db";

export async function sendMessage(message: rig.DirectMessage) {
  // const encrypted_message: chat.Message = await encryptMessage(message);
  const db = await connect();
  return new Promise((resolve, reject) => {
    const sentMessage = db.collection("messages").insertOne({message});
    resolve(sentMessage);
  });
}
