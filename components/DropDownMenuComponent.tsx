import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import React from "react";
import { cn } from "@/utils/cn";

interface Subcategory {
  type: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavLink {
  label: string;
  href?: string;
  category?: string;
  subcategories?: Subcategory[];
}

export const DropDownMenuComponent = ({
  link,
  className,
}: {
  link: NavLink;
  className?: string;
}) => {
  return (
    <DropdownMenu key={link.label}>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "text-sm uppercase hover:text-muted-foreground transition-colors duration-300 flex items-center gap-2 cursor-pointer",

            className
          )}
        >
          {link.label} <ChevronDown className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[300px]">
        {link.subcategories?.map((subcategory, index) => (
          <React.Fragment key={subcategory.type}>
            <DropdownMenuItem className="p-0">
              <Link
                href={subcategory.href}
                className="text-sm px-3 py-3 uppercase hover:text-muted-foreground transition-colors duration-300 w-full h-full flex items-center justify-between"
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
