import { SearchBar } from "@/app/browse/searchBar";
import { Button } from "@/components/ui/button";
import { getUserRoom } from "@/data-access/room";
import Link from "next/link";
import { MyRoomCard } from "./my-room-card";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function YourRoomPage() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

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

      {items.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/no-data.svg"
            width="200"
            height="200"
            alt="no data image"
          />

          <h2 className="text-2xl">You have no rooms</h2>

          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
