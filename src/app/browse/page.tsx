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
import { TagList } from "@/components/tag-list";
import { SearchBar } from "@/app/browse/searchBar";
import Image from "next/image";

function RoomCard({ room }: { room: roomSchema }) {
  return (
    <Card className="flex flex-col justify-evenly overflow-hidden">
      <CardHeader>
        <CardTitle className="">{room.name}</CardTitle>
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

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const items = await getRooms(searchParams.search);
  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms </h1>
        {
          <Button asChild>
            <Link href={"/create-room"}>Create Room</Link>
          </Button>
        }
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => {
          return <RoomCard key={item.id} room={item} />;
        })}
      </div>

      {items.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/no-data.svg"
            width="200"
            height="200"
            alt="no data image"
          />

          <h2 className="text-2xl">You have no rooms</h2>
        </div>
      )}
    </main>
  );
}
