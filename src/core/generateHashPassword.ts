import crypto from "crypto";

export function generateHashPassword(password: string) {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
}

export function matchPassword(storePassword: string, enteredPassword: string) {
  const enteredHashedPassword = generateHashPassword(enteredPassword);
  if (storePassword === enteredHashedPassword) {
    return true;
  } else {
    return false;
  }
}
