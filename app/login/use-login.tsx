"use server";

import db from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function login(email: string, password: string) {
  "use server";
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.hashedPassword) {
    return null;
  }

  // Compare the two passwords
  const match = await bcrypt.compare(password, user.hashedPassword);
  if (match) {
    const cookieStore = await cookies();
    const jwt = await new SignJWT({ email, id: user.id, name: user.name })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(key);
    cookieStore.set("token", jwt);
    return true;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
