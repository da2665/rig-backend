import { connect } from "../db/db";
import { decryptMessages } from "./decryptMessages";
import * as rig from "../types";

export async function getMessages() {
  const db = await connect();
  return new Promise(async (resolve, reject) => {
    const messages = await db.collection("messages").find({}).toArray();
    resolve(messages);
  })
}
