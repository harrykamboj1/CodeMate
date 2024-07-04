import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { roomSchema } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/data-access/room";

function RoomCard({ room }: { room: roomSchema }) {
  return (
    <Card className="flex flex-col justify-evenly overflow-hidden">
      <CardHeader>
        <CardTitle className="">{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
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

export default async function Home() {
  const items = await getRooms();
  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms </h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => {
          return <RoomCard key={item.id} room={item} />;
        })}
      </div>
    </main>
  );
}
