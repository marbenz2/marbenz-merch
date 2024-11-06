import React from "react";
import { CardDescription } from "../ui/card";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

export default function Location() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <a
          href="https://www.google.com/maps/place/44%C2%B044'19.3%22N+63%C2%B018'15.7%22W/@44.7386944,-63.305273,381m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d44.7386944!4d-63.3043611?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
          type="text"
          className="flex flex-col"
          rel="noreferrer noopener"
          target="_blank"
        >
          <CardDescription className="flex gap-2 items-center hover:text-primary transition-colors duration-300">
            <MapPinIcon className="w-4 h-4" />
            12345 Traumstadt <br /> Traumstr. 123 <br /> Traumland
          </CardDescription>
        </a>
      </div>
      <CardDescription>
        <a
          href="tel:01234567890"
          type="tel"
          className="flex gap-2 items-center hover:text-primary transition-colors duration-300"
        >
          <PhoneIcon className="w-4 h-4" /> 01234 567890
        </a>
      </CardDescription>
      <CardDescription>
        <a
          href="mailto:info@traumland.traum"
          className="flex gap-2 items-center hover:text-primary transition-colors duration-300"
        >
          <MailIcon className="w-4 h-4" /> info@traumland.traum
        </a>
      </CardDescription>
    </div>
  );
}
