"use server";

import { deleteRoom, getRoom } from "@/data-access/room";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("Session Not Found");
  }

  const room = await getRoom(roomId);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }

  await deleteRoom(roomId);
  revalidatePath("/your-rooms");
}
