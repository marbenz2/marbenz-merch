import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import React, { useState, useRef, TouchEvent } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    // Verzögerung beim Öffnen des Dropdowns
    touchTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

    // Wenn Bewegung erkannt wird, Dropdown nicht öffnen
    if (deltaX > 5 || deltaY > 5) {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
      touchStartRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchStartRef.current = null;
  };

  return (
    <DropdownMenu key={link.label} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "text-sm uppercase hover:text-muted-foreground transition-colors duration-300 flex items-center gap-2 cursor-pointer",

            className
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
