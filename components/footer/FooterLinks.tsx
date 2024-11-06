import Link from "next/link";
import { CardDescription } from "../ui/card";

export default function FooterLinks() {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href="#"
        className="text-sm uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        Impressum
      </Link>
      <Link
        href="#"
        className="text-sm uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        Datenschutz
      </Link>
      <CardDescription>...</CardDescription>
    </div>
  );
}
