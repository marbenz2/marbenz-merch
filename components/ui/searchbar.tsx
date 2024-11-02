"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

export default function Searchbar() {
  return (
    <div className="relative flex w-full py-4">
      <Input
        type="search"
        placeholder="Suchen..."
        className="w-full"
        suppressHydrationWarning
      />
      <Button className="absolute right-0 rounded-l-none">
        <SearchIcon />
      </Button>
    </div>
  );
}
