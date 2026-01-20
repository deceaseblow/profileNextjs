import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://sabinaxd:dPkG7ArsLyw5GTAS@profileapp.39krle7.mongodb.net/profileApp";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
