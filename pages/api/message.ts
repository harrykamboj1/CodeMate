import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { messages, messageSchema, room } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { roomId, userId, content } = req.body;
    const [message] = await db
      .insert(messages)
      .values({ roomId, userId, message: content })
      .returning()
      .execute();
    res.status(201).json(message);
  } else if (req.method === "GET") {
    const { roomId } = req.query;
    const prevmessages = await db
      .select()
      .from(messages)
      .where(eq(messages.roomId, roomId))
      .execute();
    res.status(200).json(prevmessages);
  } else {
    res.status(405).end();
  }
}
