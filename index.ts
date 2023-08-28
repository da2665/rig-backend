import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import * as chat from "./types/chat";
import { sendMessage } from "./methods/sendMessage";
import { getMessages } from "./methods/getMessages";
import { generateId } from "./methods/generateId";

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
      const messages = JSON.parse((await getMessages()) as unknown as string);
      socket.emit("Messages", messages);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  socket.on("Send Message", async (message: chat.Message) => {
    try {
      const messages = JSON.parse((await getMessages()) as unknown as string);

      const request: chat.Message = {
        id: await generateId(messages.length),
        sender: message.sender,
        receiver: message.receiver,
        contents: message.contents,
        attachments: message.attachments,
      };
      socket.emit("New Message", await sendMessage(request));
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});

io.listen(process.env.API_PORT as any);
