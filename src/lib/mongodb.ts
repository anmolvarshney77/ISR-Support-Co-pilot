import { MongoClient, Db, Collection } from "mongodb";
import type { CallRecord } from "@/types/call-records";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME ?? "ur_copilot";
const CALL_HISTORY_COLLECTION = "call_summaries";

let client: MongoClient | null = null;
let cachedDb: Db | null = null;

export type CallHistoryDocument = CallRecord & {
  _id?: unknown;
  createdAt: string;
};

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!MONGODB_URI) return null;
  if (client) return client;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    return client;
  } catch (err) {
    client = null;
    return null;
  }
}

export async function getDb(): Promise<Db | null> {
  const c = await getMongoClient();
  if (!c) return null;
  if (cachedDb) return cachedDb;
  cachedDb = c.db(DB_NAME);
  return cachedDb;
}

export async function getCallHistoryCollection(): Promise<Collection<CallHistoryDocument> | null> {
  const db = await getDb();
  if (!db) return null;
  return db.collection<CallHistoryDocument>(CALL_HISTORY_COLLECTION);
}
