export function generateConfirmationCode(): string {
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length: number = 6; // Adjust the length of the code as needed
  let code: string = "ECR";

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}
