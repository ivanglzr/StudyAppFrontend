import { Header } from "@/common/components/header";
import { DynamicNoteEditor } from "@/note/components";
import { getNote } from "@/note/services";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ subjectId: string; noteId: string }>;
}) {
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
