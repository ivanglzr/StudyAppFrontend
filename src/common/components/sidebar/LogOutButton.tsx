"use client";

import { LogOut } from "lucide-react";

import { logOut } from "@/auth/services";

interface Props {
  iconProps: {
    size: number;
    strokeWidth: number;
  };
}

export function LogOutButton({ iconProps }: Props) {
  return (
    <button
      onClick={logOut}
      className="flex flex-col justify-center items-center p-2 rounded-lg"
    >
      <div className="rounded-lg">
        <LogOut
          size={iconProps.size}
          strokeWidth={iconProps.strokeWidth}
          color="hsl(var(--primary))"
        />
      </div>
      <span className="text-primary text-sm whitespace-nowrap opacity-90">
        Log Out
      </span>
    </button>
  );
}
