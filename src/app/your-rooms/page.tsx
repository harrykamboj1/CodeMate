import { SearchBar } from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import { getUserRoom } from "@/data-access/room";
import Link from "next/link";
import { MyRoomCard } from "./my-room-card";

export default async function YourRoomPage() {
  const items = await getUserRoom();
  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms </h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => {
          return <MyRoomCard key={item.id} room={item} />;
        })}
      </div>
    </main>
  );
}
