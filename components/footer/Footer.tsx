import Logo from "../navigation/Logo";
import Location from "./Location";
import Copyright from "./Copyright";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="flex w-full px-4 lg:px-12 py-6 bg-background-navigation border-t-4 border-border-navigation">
      <div className="flex flex-col md:flex-row w-full gap-12">
        <div className="flex flex-col basis-1/3 gap-4 w-full h-full">
          <Logo />
          <Location />
        </div>
        <div className="flex flex-col-reverse md:flex-row basis-2/3 w-full gap-8">
          <div className="flex items-end justify-center md:justify-center w-full h-full">
            <Copyright />
          </div>
          <div className="flex items-end justify-start md:justify-center w-full h-full">
            <FooterLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
