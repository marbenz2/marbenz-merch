import Link from "next/link";
import React from "react";

interface Subcategory {
  type: string;
  href: string;
  icon: React.ReactNode;
}

interface NavLink {
  label: string;
  href?: string;
  category?: string;
  subcategories?: Subcategory[];
}

const links: NavLink[] = [];

export default function Links() {
  return (
    <div className="gap-8 hidden lg:flex" role="navigation" aria-label="Links">
      {links.map((link) => (
        <React.Fragment key={link.label}>
          {link.label === "Home" ? (
            <a
              href="/"
              className="text-sm uppercase hover:text-muted-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ) : (
            <Link
              href={link.href ?? "#"}
              className="text-sm uppercase hover:text-muted-foreground transition-colors duration-300"
            >
              {link.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
