// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Mongo URI from .env.local
if (!uri) {
  throw new Error("Please define MONGODB_URI in your .env.local");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
