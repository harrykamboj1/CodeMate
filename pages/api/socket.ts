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

        socket.emit("prevMessages", prevMessages);
      });

      socket.on("message", async (message: Omit<messageSchema, "id">) => {
        const [saveMessage] = await db
          .insert(messages)
          .values({ ...message })
          .returning();

        // Send message to all clients in the room
        io.to(message.roomId).emit("message", saveMessage);
      });

      socket.on("updateMessage", async (message: messageSchema) => {
        // Save message to the database
        console.log(message);
        const [updateMessage] = await db
          .update(messages)
          .set({ message: message.message })
          .where(eq(messages.id, message.id!))
          .returning();

        // Send message to all clients in the room
        io.to(message.roomId).emit("messageUpdated", updateMessage);
      });

      socket.on(
        "deleteMessage",
        async (object: { id: string; roomId: string }) => {
          console.log(object.id);
          const [deleteMessage] = await db
            .delete(messages)
            .where(eq(messages.id, object.id!))
            .returning();

          io.to(object.roomId).emit("messageDeleted", deleteMessage);
        }
      );

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
