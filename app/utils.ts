// generateUniqueId generates a 15 characters long string from lowercase letters and digits
export function generateUniqueId(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let uniqueId = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}
