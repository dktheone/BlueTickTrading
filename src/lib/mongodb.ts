import { MongoClient, Db, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "bluetick_trading";

if (!uri) {
  console.warn(
    "[MongoDB Warning] MONGODB_URI is not set in environment variables. Database queries may fail."
  );
}

// Resilient options for cloud deployment environments (Hostinger / AWS / Vercel)
const options: MongoClientOptions = {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const connectionString = uri || "mongodb://localhost:27017/bluetick_trading";

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR.
  if (!global._mongoClientPromise) {
    client = new MongoClient(connectionString, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, maintain a single client instance
  if (!global._mongoClientPromise) {
    client = new MongoClient(connectionString, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
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
