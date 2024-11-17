"use client";

import { LogOut } from "lucide-react";

import { logOut } from "@/services/auth/auth.service";

export function LogOutButton() {
  return (
    <button
      onClick={logOut}
      className="flex flex-col justify-center items-center p-2 rounded-lg"
    >
      <div className="rounded-lg">
        <LogOut size={30} strokeWidth={1.5} color="hsl(var(--primary))" />
      </div>
      <span className="text-primary text-sm opacity-90">Log Out</span>
    </button>
  );
}
