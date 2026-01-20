import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const animes = await db
      .collection("animes")
      .find({})
      .sort({ title: 1 })
      .toArray();

    res.status(200).json(animes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch animes" });
  }
}
