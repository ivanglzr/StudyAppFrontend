import { Header } from "@/common/components/header";
import { DynamicNoteEditor } from "@/note/components";
import { getNote } from "@/note/services";

interface Props {
  params: Promise<{ subjectId: string; noteId: string }>;
}

export default async function EditNotePage({ params }: Props) {
  const { subjectId, noteId } = await params;

  const note = await getNote(subjectId, noteId);

  return (
    <>
      <Header>
        <h1>Edit an existent note</h1>
      </Header>
      <DynamicNoteEditor
        subjectId={subjectId}
        noteId={noteId}
        initialNote={note}
      />
    </>
  );
}
