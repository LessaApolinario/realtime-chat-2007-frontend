import bcrypt from "bcryptjs";

export async function hashPassword(password: string, rounds = 10) {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
}

export async function comparePasswordWithHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
