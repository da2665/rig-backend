import { SecretsManager } from "aws-sdk";

import dotenv from "dotenv";

dotenv.config();

const secret_name = process.env.DB_SECRET_NAME;

const secretsManager = new SecretsManager({
  region: "ap-southeast-2",
});

export async function getSecret() {
  const response = await secretsManager
    .getSecretValue({
      SecretId: secret_name as string,
    })
    .promise();
  return JSON.parse(response.SecretString as string);
}
