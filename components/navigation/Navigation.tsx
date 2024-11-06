"use client";

import { useUserStore } from "@/app/stores/userStore";
import { ThemeSwitcher } from "../theme-switcher";
import Links from "./Links";
import Logo from "./Logo";
import User from "./User";
import NoUser from "./NoUser";
import Spinner from "../ui/Spinner";
import { CardDescription } from "../ui/card";

export default function Navbar() {
  const { profile, isLoading } = useUserStore();

  return (
    <nav className="flex flex-col gap-2 w-full pt-6 pb-0 px-4 lg:px-12 border-b-4 border-border-navigation bg-background-navigation">
      <div className="flex gap-4 items-center justify-between w-full mx-auto">
        <Logo />
        {/* <Links /> */}
        <div className="flex gap-4 items-center">
          {!profile && isLoading && <Spinner />}
          {!isLoading && profile && <User />}
          {!isLoading && !profile && <NoUser />}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <CardDescription className="text-xs">
          Ich bin nur ein Demo Shop!
        </CardDescription>
      </div>
    </nav>
  );
}
