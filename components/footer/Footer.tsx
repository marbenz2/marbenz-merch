import Logo from "../navigation/Logo";
import Location from "./Location";
import Copyright from "./Copyright";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="flex w-full px-12 py-4 bg-background-navigation">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 w-full h-full">
          <Logo />
          <Location />
        </div>
        <div className="flex items-end justify-center w-full h-full">
          <Copyright />
        </div>
        <div className="flex items-end justify-start w-full h-full">
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
}
