"use server";

import { deleteUser } from "@/data-access/user";
import { getSession } from "@/lib/auth";

export default async function DeleteAccountAction() {
  const session = await getSession();

  if (!session) {
    throw new Error("you must be logged in to delete your account");
  }

  await deleteUser(session.user.id);
}
