import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const client = new MongoClient(uri);
let db: Db;

export async function connectDatabase(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db("NextMart");
  }
  return db;
}

export function getDb(): Db {
  if (!db) {
    throw new Error("Database not initialized. Call connectDatabase first.");
  }
  return db;
}
