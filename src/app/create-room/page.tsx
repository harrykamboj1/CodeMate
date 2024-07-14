import { getSession } from "@/lib/auth";
import CreateRoomForm from "./create-room-form";
import { redirect } from "next/navigation";

export default async function CreateRoomPage() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto  flex flex-col gap-10 pt-12 pb-24">
      <h1 className="text-3xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}
