import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import verifyToken from "../../utils/verifyToken";  

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("profileApp");
  const mangas = db.collection("mangas");

  try {
    // GET ALL
    if (req.method === "GET") {
      const data = await mangas.find({}).toArray();
      return res.status(200).json(data);
    }
    const user = verifyToken(req); // returns decoded token or null
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // CREATE
    if (req.method === "POST") {
      const {
        title,
        author,
        year,
        genres,
        status,
        comment,
        image,
        link
      } = req.body;

      const newManga = {
        title,
        author,
        year,               // keep string
        genres,             // array
        status,
        comment,
        image,
        link
      };

      const result = await mangas.insertOne(newManga);
      return res.status(201).json(result);
    }

    // UPDATE
    if (req.method === "PUT") {
      const { id, ...updates } = req.body;

      await mangas.updateOne(
        { _id: new ObjectId(id) },
        { $set: updates }
      );

      return res.status(200).json({ success: true });
    }

    // DELETE
    if (req.method === "DELETE") {
      const { id } = req.body;

      await mangas.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Manga API error" });
  }
}
