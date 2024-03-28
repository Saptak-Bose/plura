import { ModeToggle } from "@/components/global/mode-toggle";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default async function Navigation({}: Props) {
  const user = await currentUser();

  return (
    <div className="p-4 flex items-center justify-between relative z-10">
      <Link href="/">
        <aside className="flex items-center gap-2">
          <Image
            src="/assets/plura-logo.svg"
            width={40}
            height={40}
            alt="plura-logo"
          />
          <span className="text-xl font-bold">Plura.</span>
        </aside>
      </Link>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href="#pricing">Pricing</Link>
          <Link href="#">About</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
          href="/agency"
        >
          {user ? "Console" : "Login"}
        </Link>
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </aside>
    </div>
  );
}
