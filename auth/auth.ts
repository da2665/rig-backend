import { connect } from "../db/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import * as rig from "../types";
import * as mongo from "mongodb";
import jwt from "jsonwebtoken";

export async function login(request: any): Promise<string> {
  const db = (await connect()) as any;
  return new Promise(async (resolve, reject) => {
    const user = await db
      .collection("users")
      .findOne({ email_address: request.email_address });

    bcrypt.compare(request.password, user.password, (err, isValid) => {
      if (err || !isValid) {
        console.error(`An error has occurred. Password doesn't match!\n${err}`);
        reject(err);
      } else {
        const token = jwt.sign(
          {
            username: user.username,
          },
          crypto.randomBytes(32).toString("hex")
        );
        console.log(token);
        resolve(token);
      }
    });
  });
}

export async function register(request: any): Promise<any> {
  const db = await connect();
  let user: rig.User;

  return new Promise((resolve, reject) => {
    bcrypt.hash(request.password, 10, (err, hash) => {
      if (err) {
        console.error(`Error hashing password. ${err}`);
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
