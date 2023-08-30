import { connect } from "../db/db";
import { decryptMessages } from "./decryptMessages";
import * as rig from "../types";

export async function getMessages() {
  const db = await connect();
  return new Promise((resolve, reject) => {
    try {
     
    }
    catch (error) {

    }
  })
}
