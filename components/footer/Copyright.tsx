import { CardDescription } from "../ui/card";

export default function Copyright() {
  return (
    <CardDescription>
      &copy; 2024{" "}
      <a
        href="https://www.marbenz.de"
        className="text-sm uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        MarBenz
      </a>
    </CardDescription>
  );
}
