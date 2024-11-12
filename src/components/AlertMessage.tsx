"use client";

import { Info, AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

import { useAlertMessageStore } from "@/store/alertMessage";

import { centerAbsolute } from "@/css/styles";

export function AlertMessage() {
  const isVisible = useAlertMessageStore((state) => state.isVisible);
  const props = useAlertMessageStore((state) => state.props);

  const hideAlert = useAlertMessageStore((state) => state.hideAlert);

  return (
    <>
      {isVisible && (
        <Alert
          className={`bg-background ${centerAbsolute} min-w-80 w-max shadow-lg shadow-gray-500 border-2 ${
            props.variant === "default" ? "border border-black" : ""
          }`}
          variant={props.variant}
        >
          {props.variant === "default" ? (
            <Info size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <AlertTitle className="text-lg font-bold">{props.title}</AlertTitle>
          <AlertDescription>{props.message}</AlertDescription>

          <button
            onClick={hideAlert}
            className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </Alert>
      )}
    </>
  );
}
