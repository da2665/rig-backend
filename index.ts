import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import * as rig from "./types";
import { sendMessage } from "./methods/sendMessage";
import { getMessages } from "./methods/getMessages";
import * as mongo from "mongodb";
import { register, login } from "./auth/auth";
import cookie from "cookie";

dotenv.config();

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], 
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true
  },
});

io.on("connection", (socket: Socket) => { 
  socket.on("Get Messages", async () => {
    try {
      const messages = await getMessages();
      io.emit("Initial Messages", messages);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  socket.on("Send Message", async (message: any) => {
    try {
      const request: rig.DirectMessage = {
        timestamp: Date.now(),
        from: message.from,
        to: message.to,
        contents: message.contents,
        attachments: message.attachments,
      };
      io.emit("New Message", await sendMessage(request));
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  socket.on("Login", async (request: any) => {
    const token = cookie.serialize("jwt", await login(request), {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: false,
      httpOnly: true
    });
    io.emit("Logged In", token);
  });

  socket.on("Register", async (request: any) => {
    io.emit("Registered", await register(request));
  });
});

io.listen(process.env.API_PORT as any);
