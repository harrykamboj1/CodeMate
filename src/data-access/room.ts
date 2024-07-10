import { db } from "@/db";
import { room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db?.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRoom() {
  unstable_noStore();
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const rooms = await db?.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  const rooms = await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
  return rooms;
}

export async function deleteRoom(roomId: string) {
  unstable_noStore();
  if (room == null || room == undefined) {
    throw new Error("Room not defined");
  }
  const rooms = await db.delete(room).where(eq(room.id, roomId)).returning();

  return rooms;
}
