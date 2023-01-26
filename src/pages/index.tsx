import { trpc } from "../utils/trpc";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <div className="text-2xl text-center pt-8">Which Pokémon is Rounder</div>
      <div className="p-2">
        <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
          <div className="w-16 h-16 bg-red-200"></div>
          <div className="p-8">
            <p>{hello.data.greeting}</p>
            VS
          </div>

          <div className="w-16 h-16 bg-red-200"></div>
        </div>
      </div>
    </div>
  );
}
