import CreateRoomForm from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className="container mx-auto  flex flex-col gap-10 pt-12 pb-24">
      <h1 className="text-3xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
}
