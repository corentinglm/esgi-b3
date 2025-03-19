import { getAndVerifyToken } from "@/lib/jwt";

export default function Home() {
  const name = getAndVerifyToken().then((payload) => payload.name as string);

  return (
    <>
      <div className="container p-4">
        <h1 className=" font-bold text-4xl">Bonjour, {name}</h1>
      </div>
    </>
  );
}
