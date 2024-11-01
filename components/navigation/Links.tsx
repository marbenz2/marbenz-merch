import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ShirtIcon, GemIcon } from "lucide-react";

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

const links: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Produkte",
    category: "products",
    subcategories: [
      {
        type: "pullover",
        href: "/categories/pullover",
        icon: <ShirtIcon />,
      },
      { type: "shirts", href: "/categories/shirts", icon: <ShirtIcon /> },
      {
        type: "accessoires",
        href: "/categories/accessoires",
        icon: <GemIcon />,
      },
    ],
  },
  {
    label: "Kontakt",
    href: "/contact",
  },
];

export default function Links() {
  return (
    <div className="flex gap-8" role="navigation" aria-label="Links">
      {links.map((link) => (
        <React.Fragment key={link.label}>
          {link.subcategories ? (
            <DropDownMenu link={link} />
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

const DropDownMenu = ({ link }: { link: NavLink }) => {
  return (
    <DropdownMenu key={link.label}>
      <DropdownMenuTrigger>
        <p className="text-sm uppercase hover:text-muted-foreground transition-colors duration-300">
          {link.label}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[300px]">
        {link.subcategories?.map((subcategory, index) => (
          <React.Fragment key={subcategory.type}>
            <DropdownMenuItem>
              <Link
                href={subcategory.href}
                className="text-sm uppercase hover:text-muted-foreground transition-colors duration-300 w-full h-full flex items-center justify-between"
              >
                {subcategory.icon}
                {subcategory.type}
              </Link>
            </DropdownMenuItem>
            {index !== (link.subcategories?.length ?? 0) - 1 && (
              <DropdownMenuSeparator />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
