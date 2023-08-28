import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Server } from "socket.io";
import * as chat from "./types/chat";
import { sendMessage } from "./methods/sendMessage";
import { getMessages } from "./methods/getMessages";
import { generateId } from "./methods/generateId";

AWS.config.update({ region: process.env.REGION });
dotenv.config();

const io = new Server({
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket: any) => {
  socket.on("Get Messages", async () => {
    try {
      const messages = await getMessages();
      socket.emit("Messages", JSON.parse(messages as string));
      socket.emit("New Message", JSON.parse(messages as string));
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("Send Message", async (message: chat.Message) => {
    try {
      const messages = JSON.parse(
        (await getMessages()) as string
      ) as chat.Message[];

      const request: chat.Message = {
        id: await generateId(messages.length),
        sender: message.sender,
        receiver: message.receiver,
        contents: message.contents,
        attachments: message.attachments,
      };

      await sendMessage(request);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    socket.removeAllListeners();
  });
});

io.listen(process.env.API_PORT as any);
