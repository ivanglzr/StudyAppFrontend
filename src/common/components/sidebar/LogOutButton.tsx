"use client";

import { LogOut } from "lucide-react";

import { logOut } from "@/auth/services";

interface Props {
  iconProps: {
    className: string;
    strokeWidth: number;
  };
}

export function LogOutButton({ iconProps }: Props) {
  return (
    <button
      onClick={logOut}
      className="flex flex-col justify-center items-center p-2 sm:p-4 rounded-lg"
    >
      <div className="rounded-lg flex">
        <LogOut
          className={iconProps.className}
          strokeWidth={iconProps.strokeWidth}
          color="hsl(var(--primary))"
        />
      </div>
      <span className="text-primary text-xs sm:text-sm whitespace-nowrap opacity-90">
        Log Out
      </span>
    </button>
  );
}
