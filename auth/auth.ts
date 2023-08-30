import { connect } from "../db/db";
import bcrypt from "bcrypt";
import * as rig from "../types";
import * as mongo from "mongodb";
import axios from "axios";

export async function login(request: any): Promise<any> {
  const db = await connect() as any;
  return new Promise((resolve, reject) => {
    db.collection("users").findOne(
      { email_address: request.email_address },
      (err: any, user: rig.User) => {
        if (err) {
          console.error(`An error has occurred. User not found!\n${err}`);
          reject(err);
        } else {
          bcrypt.compare(
            request.password,
            user.password,
            async (err, isValid) => {
              if (err || !isValid) {
                console.error(
                  `An error has occurred. Password doesn't match!\n${err}`
                );
                reject(err);
              } else {
                const token: string = await getToken();
                console.log(`Logged user in!`);
                resolve(JSON.stringify(token as string, null, 2));
              }
            }
          );
        }
      }
    );
  });
}

export async function register(request: any): Promise<any> {
  const db = await connect();
  let user: rig.User;

  return new Promise((resolve, reject) => {
    bcrypt.hash(request.password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      user = {
        id: new mongo.ObjectId(),
        firstName: request.firstName,
        lastName: request.lastName,
        email_address: request.email_address,
        username: request.username,
        password: hash,
        profile_photo: null,
        isAuthenticated: false,
        messageHistory: [],
      };
      resolve(db.collection("users").insertOne(user));
    });
  });
}

async function getToken(): Promise<string> {
  
  return new Promise((resolve, reject) => {
    resolve("tism.wanker.com")
  });
}
