import { connect } from "../db/db";

export async function getMessages() {
  const db = await connect();
  return new Promise(async (resolve, reject) => {
    const messages = await db.collection("messages").find({}).toArray();
    resolve(messages);
  })
}
