import express from "express";
import dotenv from "dotenv";
import * as chat from "./types/chat";
import { sendMessage } from "./methods/sendMessage";
import { getMessages } from "./methods/getMessages";
import { generateId } from "./methods/generateId";
import cors from "cors";
import AWS from "aws-sdk";
AWS.config.update({ region: process.env.REGION });
dotenv.config();
const app = express();

app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "*",
  })
);

app.get("/getUpdates", (req, res) => {
  const params = {
    Name: process.env.SSM_PARAMETER_NAME as string,
  };

  const ssm = new AWS.SSM();
  ssm.getParameter(params, (err, data) => {
    if (err) console.error(err);
    else {
      console.log(`Pulling version ${data.Parameter?.Value} from S3...`);
      res.send(data.Parameter?.Value);
    }
  });
});

app.get("/getMessages", async (req, res) => {
  res.send(JSON.stringify(await getMessages(), null, 2));
});

app.post("/sendMessage", async (req, res) => {
  const messages = await getMessages() as chat.Message[];
  const request: chat.Message = {
    id: await generateId(messages.length),
    sender: req.query.sender as string,
    receiver: req.query.receiver as string,
    contents: req.query.contents as string,
    attachments: req.query.attachments as string
  };
  res.send(await sendMessage(request));
});

app.listen(process.env.API_PORT, () => {
  console.info("Listening for requests...");
});
