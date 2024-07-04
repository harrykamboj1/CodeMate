import { Button } from "@/components/ui/button";
import { db } from "@/db";
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

function RoomCard({ room }: { room: roomSchema }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link className="flex gap-1" href={room.githubRepo!}>
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <p>{room.language}</p>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  const items = await db.query.room.findMany();
  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms </h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      {items.map((item) => {
        return <RoomCard key={item.id} room={item} />;
      })}
    </main>
  );
}
