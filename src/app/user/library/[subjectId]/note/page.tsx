import { Header } from "@/common/components/header";
import { DynamicNoteEditor } from "@/note/components";

interface Props {
  params: Promise<{ subjectId: string }>;
}

export default async function CreateNotePage({ params }: Props) {
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
