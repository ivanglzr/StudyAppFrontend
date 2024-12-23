import { Header } from "@/common/components/header";
import { DynamicNoteEditor } from "@/note/components";

export default async function CreateNotePage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;

  return (
    <>
      <Header>
        <h1>Create a new note</h1>
      </Header>
      <DynamicNoteEditor subjectId={subjectId} />
    </>
  );
}
