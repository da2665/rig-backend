import { getSecret } from "./getSecret";
import dotenv from "dotenv";
import * as mongo from "mongodb";

dotenv.config();

export async function connect(): Promise<mongo.Db> {
  const secret = await getSecret();

  const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost");
  await client.connect();
  const db: mongo.Db = client.db("rigdb");

  return db;
}
