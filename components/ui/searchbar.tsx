"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useCallback, useState } from "react";

interface SearchbarProps {
  onSearch: (term: string) => void;
}

export default function Searchbar({ onSearch }: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <div className="relative flex w-full py-4">
      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Suchen..."
        className="w-full"
        suppressHydrationWarning
      />
      {/*       <Button className="absolute right-0 rounded-l-none">
        <SearchIcon />
      </Button> */}
    </div>
  );
}
