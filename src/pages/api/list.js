import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const links = await db
      .collection("list")
      .find({})
      .sort({ name: 1 })
      .toArray();

    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch list" });
  }
}
