"use client";

import { Info, AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui";

import { useAlertMessageStore } from "../store";

import { centerAbsolute } from "@/common/css/styles";

export function AlertMessage() {
  const isVisible = useAlertMessageStore((state) => state.isVisible);
  const props = useAlertMessageStore((state) => state.props);

  const hideAlert = useAlertMessageStore((state) => state.hideAlert);

  return (
    <>
      {isVisible && (
        <Alert
          className={`bg-background ${centerAbsolute} min-w-80 w-max border-2 ${
            props.variant === "default" ? "border border-foreground" : ""
          }`}
          variant={props.variant}
        >
          {props.variant === "default" ? (
            <Info size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <AlertTitle className="text-2xl font-bold">{props.title}</AlertTitle>
          <AlertDescription className="text-lg">
            {props.message}
          </AlertDescription>

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
