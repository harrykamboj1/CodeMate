"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagList } from "./tag-list";
import Link from "next/link";
import { GithubIcon, Trash, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { roomSchema } from "@/db/schema";

export function RoomCard({ room }: { room: roomSchema }) {
  return (
    <Card className="flex flex-col justify-evenly overflow-hidden">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{room.name}</CardTitle>
          <Trash className=" hover:dark:bg-muted-foreground" />
        </div>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagList tags={room.tags.split(",").map((tag) => tag.trim())} />
        {room.githubRepo && (
          <Link
            className="flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
            href={room.githubRepo}
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
