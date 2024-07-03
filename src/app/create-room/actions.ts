"use server";

import { db } from "@/db";
import { room, roomSchema } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function CreateRoomAction(roomData: Omit<roomSchema, "userId">) {
  const session = await getSession();
  console.log(session);

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }
  await db.insert(room).values({
    ...roomData,
    userId: session.user?.id,
  });
}
