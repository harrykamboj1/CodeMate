import { db } from "@/db";

export default async function Home() {
  const items = await db.query.room.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {items.map((item) => {
        return <div key={item.userId}>{JSON.stringify(item)}</div>;
      })}
    </main>
  );
}
