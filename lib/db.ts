import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI enviroment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  const c = cached;

  if (c.conn) {
    console.log("=> Using existing CACHED connection");
    return c.conn;
  }

  if (!c.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("=> Creating NEW DB_Connection...");

    c.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log("=> Successfully connected to MONGO_DB");
      return m;
    });
  } else {
    console.log("=> Wating for existing connection promise...");
  }

  try {
    c.conn = await c.promise;
  } catch (e) {
    c.promise = null;
    console.error("=> Database connection ERROR!!!", e);
    throw e;
  }

  return c.conn;
}
