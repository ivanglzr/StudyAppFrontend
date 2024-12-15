import { Header } from "@/common/components/header";
import { FlashcardsCarousel } from "@/flashcard/components";
import { CreateFlashcardDialog } from "@/flashcard/components";

import { getSubject } from "@/subject/services";

interface Props {
  params: { subjectId: string };
}

export default async function SubjectPage({ params }: Props) {
  const { subjectId } = await params;

  const subject = await getSubject(subjectId);

  if (!subject) return <span>Subject not found</span>;

  return (
    <>
      <Header>
        <h1>{subject.subjectName}</h1>{" "}
        <CreateFlashcardDialog subjectId={subject._id} />
      </Header>
      <FlashcardsCarousel flashcards={subject.flashcards} />
    </>
  );
}
