import { PrismaClient } from "@prisma/client";
declare global {
  var __database__: PrismaClient;
}

let db: PrismaClient;

if (global.__database__) {
  db = global.__database__;
} else {
  db = new PrismaClient();
  global.__database__ = db;
}

export default db;
