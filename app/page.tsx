import { Button } from "@/components/ui/button";
import { links } from "@/utils/links";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-cols-3 p-24 gap-4">
      {links.map((link) => (
        <Button asChild size={"lg"} variant={"outline"}>
          <Link key={link.label} href={link.href}>
            <span className=" capitalize">{link.label}</span>
          </Link>
        </Button>
      ))}
    </main>
  );
}
