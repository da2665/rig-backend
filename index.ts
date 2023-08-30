import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import * as rig from "./types";
import { sendMessage } from "./methods/sendMessage";
import { getMessages } from "./methods/getMessages";
import * as mongo from "mongodb";
import { register, login } from "./auth/auth";
AWS.config.update({ region: process.env.REGION });
dotenv.config();

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("Get Messages", async () => {
    try {
      const messages = JSON.parse(await getMessages() as string);
      io.emit("Initial Messages", messages);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  socket.on("Send Message", async (message: rig.DirectMessage) => {
    try {
      const request: rig.DirectMessage = {
        id: new mongo.ObjectId(),
        timestamp: Date.now(),
        from: message.from,
        to: message.to,
        contents: message.contents,
        attachments: message.attachments,
      };
      io.emit("New Message", JSON.parse(await sendMessage(request) as string));
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  socket.on("Login", async (request: any) => {
    io.emit("Logged In", await login(request));
  });

  socket.on("Register", async (request: any) => {
    io.emit("Registered", await register(request));
  });
});

io.listen(process.env.API_PORT as any);
