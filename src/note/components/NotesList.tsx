import Link from "next/link";
import { NoteItem } from ".";
import { AddButton } from "@/common/components/buttons";

import { INote } from "../interfaces";

import { ROUTES } from "@/config";

interface Props {
  notes: INote[];
  subjectId: string;
}

export function NotesList({ notes, subjectId }: Props) {
  return (
    <div className="mt-4 pt-2 border-t-2 border-t-background">
      <header className="flex justify-between">
        <h2 className="mb-2 text-2xl">Notes</h2>
        <Link href={ROUTES.CREATE_NOTE_PAGE(subjectId)}>
          <AddButton text="Add Note" />
        </Link>
      </header>
      <ul>
        {notes.map((note) => (
          <NoteItem note={note} subjectId={subjectId} key={note._id} />
        ))}
      </ul>
    </div>
  );
}
