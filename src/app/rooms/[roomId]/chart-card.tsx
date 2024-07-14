"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messageSchema, roomSchema } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io({
  path: "/api/socket",
});

export default function ChatCard({ room }: { room: roomSchema }) {
  const session = useSession();
  const userId = session.data?.user.id;

  const [messages, setMessages] = useState<messageSchema[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", room.id);

    socket.on("prevMessages", (prevMessages) => {
      setMessages(prevMessages);
    });

    socket.on("message", (message: messageSchema) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
      socket.off("prevMessages");
    };
  }, [room]);

  const sendMessage = (roomId: string, userId: string) => {
    socket.emit("message", { roomId, userId, message });
    setMessage("");
  };

  return (
    <ScrollArea className="h-80 rounded-md border">
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="py-5">
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter your Message"
          defaultValue={""}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          onClick={(e) => sendMessage(room.id!, session.data?.user.id!)}
        >
          Send
        </Button>
      </div>
    </ScrollArea>
  );
}
