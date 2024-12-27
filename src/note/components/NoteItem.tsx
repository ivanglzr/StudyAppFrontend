"use client";

import Link from "next/link";
import { Default as DefaultIcon } from "@/document/components";

import { useAlertMessageStore } from "@/alert-message/store";

import { Trash2 } from "lucide-react";

import { deleteNote } from "../services";

import { INote } from "../interfaces";

import { ROUTES } from "@/config";

interface Props {
  note: INote;
  subjectId: string;
}

export function NoteItem({ note, subjectId }: Props) {
  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const handleDelete = async () => {
    const message = await deleteNote(subjectId, note._id);

    showAlert({
      title: "Success",
      message,
      variant: "default",
    });
  };

  return (
    <li key={note._id} className="flex justify-between mb-1">
      <Link
        href={ROUTES.EDIT_NOTE_PAGE(subjectId, note._id)}
        className="flex items-center gap-1"
        aria-label="Link to an especific note"
      >
        <DefaultIcon className="hidden sm:inline-block w-12 h-12" />
        <div>
          <h3 key={note._id} className="text-sm sm:text-md lg:text-lg">
            {note.title}
          </h3>
          <p className="text-[8px] md:text-xs opacity-75">
            {note.content.substring(0, 30)}...
          </p>
        </div>
      </Link>
      <button onClick={handleDelete} className="mr-3 sm:mr-16">
        <Trash2 />
      </button>
    </li>
  );
}
