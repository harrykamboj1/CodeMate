"use server";

import { getRoom } from "@/data-access/room";
import { db } from "@/db";
import { room, roomSchema } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function EditRoomAction(
  roomData: Omit<roomSchema, "userId">,
  userId: string
) {
  const session = await getSession();

  if (!session) {
    throw new Error("you must be logged in to edit this room");
  }

  const getRoom1 = await getRoom(roomData.id!);

  if (getRoom1?.userId !== session.user.id) {
    throw new Error("User not Authorized");
  }

  console.log(roomData);
  await db.update(room).set(roomData).where(eq(room.id, roomData.id!));

  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/your-rooms");
}
