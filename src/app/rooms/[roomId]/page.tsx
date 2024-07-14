import { TagList } from "@/components/tag-list";
import { getRoom } from "@/data-access/room";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { DevVideoPlayer } from "./video-player";
import ChatCard from "./chart-card";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  if (!room) {
    return <div>No room of this Id found</div>;
  }

  const tags = room.tags.split(",").map((tag) => tag.trim());

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3  p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm  text-black dark:text-white p-4">
          <DevVideoPlayer room={room} />
        </div>
      </div>
      <div className="static flex flex-col col-span-1 p-4 gap-y-5">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm  text-black dark:text-white p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>
          {room.githubRepo && (
            <Link
              className="flex items-center gap-2 text-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
              href={room.githubRepo}
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room?.description}</p>
          <h3>Tags:</h3>
          <TagList tags={tags} />
        </div>
        <div>
          <ChatCard room={room} />
        </div>
      </div>
    </div>
  );
}
