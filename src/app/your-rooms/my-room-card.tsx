"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import { Edit, GithubIcon, Trash2 } from "lucide-react";
import { roomSchema } from "@/db/schema";
import { TagList } from "@/components/tag-list";
import { Button } from "@/components/ui/button";
import { deleteRoomAction } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function MyRoomCard({ room }: { room: roomSchema }) {
  const { toast } = useToast();

  const router = useRouter();
  return (
    <Card className="flex flex-col justify-evenly overflow-hidden">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{room.name}</CardTitle>
          <Edit
            className="hover:cursor-pointer"
            onClick={() => router.push(`/edit-room?room=${room.id!}`)}
          />
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
      <CardFooter className="flex justify-between">
        <Button size={"sm"} asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={"sm"} variant={"destructive"}>
              <Trash2 className="mr-2" /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete room?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                room and its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await deleteRoomAction(room.id!);
                  toast({
                    title: "Room deleted",
                    description: "Your room was successfully deleted",
                  });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
