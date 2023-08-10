import express from "express";
import dotenv from "dotenv";
import * as chat from "./types/chat";
import { sendMessage } from "./methods/sendMessage";
import { getMessages } from "./methods/getMessages";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
    methods: ["GET", "POST"],
    origin: "*"
}));

app.get("/getMessages", async (req, res) => {
    res.send(await getMessages());
})

app.post("/sendMessage", async (req, res) => {
  const request: chat.Message = {
    id: 1,
    sender: req.query.sender as string,
    receiver: req.query.receiver as string,
    contents: req.query.contents as string,
  };
  await sendMessage(request);
});

app.listen(process.env.API_PORT, () => {
  console.info("Listening for requests...");
});
