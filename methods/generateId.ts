import { getMessages } from "./getMessages";

let newId: number = 0;
export async function generateId() {
  const messages = (await getMessages()) as [];

  newId = messages.length + 1;
  return newId as number;
}
