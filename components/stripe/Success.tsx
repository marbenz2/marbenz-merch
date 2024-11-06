import Image from "next/image";
import React from "react";
import { CardTitle } from "../ui/card";

export default function Success() {
  return (
    <div className="flex w-full flex-col gap-4 justify-center items-center p-3">
      <Image
        src="/images/success.gif"
        alt="Success"
        width={100}
        height={100}
        className="w-full"
      />
    </div>
  );
}
