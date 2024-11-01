"use client";

import { useUserStore } from "@/app/stores/userStore";
import { ThemeSwitcher } from "../theme-switcher";
import Links from "./Links";
import Logo from "./Logo";
import User from "./User";
import NoUser from "./NoUser";

export default function Navbar() {
  const profile = useUserStore((state) => state.profile);

  return (
    <nav className="flex w-full py-6 px-4 lg:px-12 border-b-4 border-border-navigation bg-background-navigation">
      <div className="flex gap-4 items-center justify-between w-full mx-auto">
        <Logo />
        <Links />
        <div className="flex gap-4 items-center">
          {profile && <User />}
          {!profile && <NoUser />}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
