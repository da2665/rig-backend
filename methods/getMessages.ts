import { connect } from "../db/db";

export async function getMessages() {
  const connection = await connect();
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from messages`, (err, res) => {
        if (err) reject(err);
        else resolve(JSON.stringify(res, null, 2));
      });
  });
}
