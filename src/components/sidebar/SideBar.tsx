"use client";

import { usePathname } from "next/navigation";

import { Home, Library } from "lucide-react";

import { LogOutButton } from "./LogOutButton";
import { LinkIcon } from "./LinkIcon";

import { ROUTES } from "@/config";

const iconProps = {
  size: 30,
  strokeWidth: 1.5,
};

const links = [
  {
    text: "Home",
    icon: (color: string) => <Home {...iconProps} color={color} />,
    href: ROUTES.HOME,
  },
  {
    text: "Library",
    icon: (color: string) => <Library {...iconProps} color={color} />,
    href: ROUTES.LIBRARY,
  },
];

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="bg-muted">
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
