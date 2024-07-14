import { getRoom } from "@/data-access/room";
import EditRoomForm from "./edit-room-form";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function CreateRoomPage({
  searchParams,
}: {
  searchParams: { room: string };
}) {
  unstable_noStore();
  const room = await getRoom(searchParams.room);
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mx-auto  flex flex-col gap-10 pt-12 pb-24">
      <h1 className="text-3xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
