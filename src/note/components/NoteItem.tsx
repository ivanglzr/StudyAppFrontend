import Link from "next/link";
import { Default as DefaultIcon } from "@/document/components";

import { INote } from "../interfaces";

import { ROUTES } from "@/config";

interface Props {
  note: INote;
  subjectId: string;
}

export function NoteItem({ note, subjectId }: Props) {
  return (
    <li key={note._id} className="mb-1">
      <Link
        href={ROUTES.EDIT_NOTE_PAGE(subjectId, note._id)}
        className="flex items-center gap-1"
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
    </li>
  );
}
