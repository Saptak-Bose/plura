"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {};

export default function Unauthorized({}: Props) {
  const router = useRouter();

  return (
    <div className="p-4 text-center h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl md:text-6xl">Unauthorized Access!!</h1>
      <p>
        Please contact with the support team or your agency owner to get access.
      </p>
      <Button onClick={() => router.push("/")} className="mt-4 font-semibold">
        Back to Home
      </Button>
    </div>
  );
}
