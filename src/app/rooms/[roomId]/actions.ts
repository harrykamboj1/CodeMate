"use server";
import { StreamChat } from "stream-chat";

import { getSession } from "@/lib/auth";

export async function generateToken() {
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }

  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY;
  const api_secret = process.env.NEXT_PUBLIC_GET_STREAM_API_SECRET_KEY;
  const user_id = session.user?.id;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key!, api_secret);
  // Create User Token
  const token = serverClient.createToken(user_id);
  return token;
}
