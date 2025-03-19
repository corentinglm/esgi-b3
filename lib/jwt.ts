import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function getAndVerifyToken() {
  const cookiesStorage = await cookies();
  const token = cookiesStorage.get("token");
  if (token) {
    try {
      return (await jwtVerify(token.value, key)).payload;
    } catch {
      throw new Error("Invalid token");
    }
  }
}
