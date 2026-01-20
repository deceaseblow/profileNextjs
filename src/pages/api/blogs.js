import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import verifyToken from "../../utils/verifyToken";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("profileApp");
  const collection = db.collection("blogs");

  try {
    // GET all blogs
    if (req.method === "GET") {
      const blogs = await collection.find({}).sort({ date: -1 }).toArray();
      return res.status(200).json(blogs);
    }

    const user = verifyToken(req); // returns decoded token or null
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // CREATE blog
    if (req.method === "POST") {
      const { title, content, image, date } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const result = await collection.insertOne({
        title,
        content,
        image: image || "",
        date: date || new Date().toISOString(),
      });

      return res.status(201).json(result);
    }

    // UPDATE blog
    if (req.method === "PUT") {
      const { id, ...updatedData } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing blog ID" });
      }

      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      return res.status(200).json({ message: "Blog updated" });
    }

    // DELETE blog
    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing blog ID" });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json({ message: "Blog deleted" });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end("Method Not Allowed");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
