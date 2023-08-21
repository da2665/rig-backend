export async function generateId(currentId: number): Promise<number> {
  const newId: number = currentId + 1;
  return newId;
}
