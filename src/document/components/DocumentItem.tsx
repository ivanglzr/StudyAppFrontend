"use client";

import { extname } from "path";

import { useAlertMessageStore } from "@/alert-message/store";

import Link from "next/link";
import { Icon } from ".";
import { Trash2 } from "lucide-react";

import { deleteDocument } from "../services";

import { ROUTES } from "@/config";

interface Props {
  document: string;
  subjectId: string;
}

function getStringBeforeDash(input: string) {
  const match = input.match(/^(.*?)-\d+\./);
  return match ? match[1] : null;
}

export function DocumentItem({ document, subjectId }: Props) {
  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const deleteDoc = async () => {
    const message = await deleteDocument(subjectId, document);

    showAlert({
      title: message ? "Success" : "Error",
      message: message ?? "An error ocurred",
      variant: message ? "default" : "destructive",
    });
  };

  const documentName = getStringBeforeDash(document);

  return (
    <li key={document} className="flex justify-between">
      <Link
        href={ROUTES.DOCUMENT_PAGE(subjectId, document)}
        className="flex items-center gap-2"
      >
        <Icon ext={extname(document)} className="w-8 h-8 sm:w-12 sm:h-12" />
        <span className="text-lg hidden lg:block">
          {documentName?.substring(0, 83)}
        </span>
        <span className="block lg:hidden text-xs sm:text-lg">
          {documentName?.substring(0, 38)}
        </span>
      </Link>
      <button className="mr-3 sm:mr-16" onClick={deleteDoc}>
        <Trash2 />
      </button>
    </li>
  );
}
