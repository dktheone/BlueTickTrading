import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "bluetick_trading";

if (!uri) {
  console.warn(
    "[MongoDB Warning] MONGODB_URI is not set in environment variables. Database queries may fail."
  );
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri || "mongodb://localhost:27017/bluetick_trading");
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri || "mongodb://localhost:27017/bluetick_trading");
  clientPromise = client.connect();
}

/**
 * Returns a connected MongoClient instance.
 */
export default clientPromise;

/**
 * Helper to get the default BlueTick Trading database instance.
 */
export async function getMongoDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
