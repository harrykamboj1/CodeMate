import { NextApiRequest, NextApiResponse } from "next";
import { Socket as NetSocket } from "net";
import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import { db } from "@/db";
import { messages, messageSchema, room } from "@/db/schema";
import { eq } from "drizzle-orm";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.Io");

    const httpServer: HTTPServer = res.socket.server as any;
    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("joinRoom", async (roomId) => {
        socket.join(roomId);
        console.log(`Client joined with roomId :: ${roomId}`);

        // Fetch and send previous messages to the client
        const prevMessages = await db
          .select()
          .from(messages)
          .where(eq(messages.roomId, roomId))
          .execute();
        console.log("prevMessages :: " + prevMessages);
        socket.emit("prevMessages", prevMessages);
      });

      socket.on("message", async (message: Omit<messageSchema, "id">) => {
        // Save message to the database
        console.log(message);
        const [saveMessage] = await db
          .insert(messages)
          .values({ ...message })
          .returning();

        // Send message to all clients in the room
        io.to(message.roomId).emit("message", saveMessage);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  } else {
    console.log("Socket.IO already initialized");
  }
  res.end();
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: IOServer;
    };
  };
};