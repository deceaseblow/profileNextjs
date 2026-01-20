import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const movies = await db
      .collection("shows")
      .find({})
      .sort({ year: -1 })
      .toArray();

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch shows" });
  }
}
