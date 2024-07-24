import Link from "next/link";
import Image from "next/image";
import React from "react";

interface LinkItem {
  href: string;
  src: string;
  alt: string;
  text: string;
}

const NavItems = () => {
  const links: LinkItem[] = [
    {
      href: "/fun-board",
      src: "/navbarIcon/laughIcon.svg",
      alt: "Smile Face Icon",
      text: "Fun Board",
    },
    {
      href: "/search",
      src: "/navbarIcon/searchIcon.svg",
      alt: "Search Icon",
      text: "Search",
    },
    {
      href: "/shop",
      src: "/navbarIcon/shopIcon.svg",
      alt: "Search Icon",
      text: "Shop",
    },
  ];

  return (
    <>
      {links.map((link: LinkItem, index: number) => (
        <Link
          key={index}
          href={link.href}
          className="flex text-sm gap-1 hover:border-b-4 hover:border-primary h-full items-center"
        >
          <div className="relative h-[20px] w-[20px]">
            <Image
              src={link.src}
              alt={link.alt}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {link.text}
        </Link>
      ))}
    </>
  );
};

export default NavItems;
