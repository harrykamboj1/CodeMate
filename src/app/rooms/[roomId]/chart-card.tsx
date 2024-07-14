"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messageSchema, roomSchema } from "@/db/schema";
import { Send, SendHorizonalIcon, Edit, Trash, Delete } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useToast } from "@/components/ui/use-toast";

const socket = io({
  path: "/api/socket",
});

export default function ChatCard({ room }: { room: roomSchema }) {
  const session = useSession();
  const { toast } = useToast();
  const [messages, setMessages] = useState<messageSchema[]>([]);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", room.id);

    socket.on("prevMessages", (prevMessages) => {
      setMessages(prevMessages);
    });

    socket.on("message", (message: messageSchema) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("messageUpdated", (updatedMessage: messageSchema) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg
        )
      );
    });

    socket.on("messageDeleted", (deleteMessage: messageSchema) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== deleteMessage.id)
      );
    });

    return () => {
      socket.off("message");
      socket.off("prevMessages");
      socket.off("messageUpdated");
      socket.off("messageDeleted");
    };
  }, [room]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editMode && editMessageId) {
        updateMessage(
          editMessageId,
          room.id!,
          session.data?.user.id!,
          session.data?.user.image!
        );
      } else {
        sendMessage(
          room.id!,
          session.data?.user.id!,
          session.data?.user.image!
        );
      }
    }
  };

  const sendMessage = (roomId: string, userId: string, image: string) => {
    if (message.trim() === "") return;
    socket.emit("message", { roomId, userId, message, image });
    setMessage(""); // Clear message input after sending
  };

  const updateMessage = (
    id: string,
    roomId: string,
    userId: string,
    image: string
  ) => {
    if (message.trim() === "") return;
    socket.emit("updateMessage", { id, roomId, userId, message, image });
    setMessage("");
    setEditMode(false);
    setEditMessageId(null);
  };

  const deleteMessage = (id: string, roomId: string) => {
    socket.emit("deleteMessage", { id, roomId });
    toast({
      title: "Message Deletion",
      description: "Your message was successfully deleted",
      duration: 500,
    });
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(message + emojiData.emoji);
  };

  const startEdit = (msg: messageSchema) => {
    setEditMode(true);
    setEditMessageId(msg.id!);
    setMessage(msg.message);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow h-96 rounded-md border-2 p-2 overflow-auto">
        <div>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No messages yet...
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="flex py-2 pl-2 items-start justify-between"
              >
                <div className="flex">
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage src={msg.image ?? ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-bold dark:text-slate-300 text-slate-900">
                      {session?.data?.user?.name}
                    </h1>
                    <p className="text-sm font-light dark:text-slate-400 text-slate-600">
                      {msg.message}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.createdAt!).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {session.data?.user.id == msg.userId && (
                    <Edit
                      className="h-4 w-4 hover:cursor-pointer"
                      onClick={() => startEdit(msg)}
                    />
                  )}

                  {session.data?.user.id == msg.userId && (
                    <Trash
                      className="h-4 w-4 hover:cursor-pointer"
                      onClick={() => deleteMessage(msg.id!, msg.roomId)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="flex w-full items-center space-x-2 mt-1 relative">
        <Input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow"
        />
        <Button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          😀
        </Button>
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2 z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <Button
          type="submit"
          onClick={() =>
            editMode && editMessageId
              ? updateMessage(
                  editMessageId,
                  room.id!,
                  session.data?.user.id!,
                  session.data?.user.image!
                )
              : sendMessage(
                  room.id!,
                  session.data?.user.id!,
                  session.data?.user.image!
                )
          }
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <SendHorizonalIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
