"use client";

import { usePathname } from "next/navigation";

import { Home, Library, User } from "lucide-react";

import { LogOutButton } from "./LogOutButton";
import { LinkIcon } from "./LinkIcon";

import { ROUTES } from "@/config";

const iconProps = {
  size: 30,
  strokeWidth: 1.5,
};

interface ILink {
  text: string;
  icon: (color: string) => JSX.Element;
  href: string;
}

const links: ILink[] = [
  {
    text: "Home",
    icon: (color) => <Home {...iconProps} color={color} />,
    href: ROUTES.HOME,
  },
  {
    text: "Library",
    icon: (color) => <Library {...iconProps} color={color} />,
    href: ROUTES.LIBRARY,
  },
  {
    text: "Profile",
    icon: (color) => <User {...iconProps} color={color} />,
    href: ROUTES.PROFILE,
  },
];

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="bg-muted fixed w-20 h-full">
      <ul className="h-full flex flex-col items-center mt-1">
        {links.map(({ text, icon, href }) => (
          <li key={text} className="w-full px-2 mt-1">
            <LinkIcon
              icon={icon}
              href={href}
              text={text}
              isActive={href === pathname}
            />
          </li>
        ))}
        <li className="w-full mt-auto mb-6 px-2">
          <LogOutButton />
        </li>
      </ul>
    </aside>
  );
}
