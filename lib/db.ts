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

  if (c.conn) return c.conn;

  if (!c.promise) {
    const opts = {
      bufferCommands: false,
    };

    c.promise = mongoose.connect(MONGO_URI, opts).then((m) => m);
  }

  c.conn = await c.promise;
  return c.conn;
}
