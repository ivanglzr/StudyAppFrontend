import { Header } from "@/components/header/Header";
import { FlashcardsCarousel } from "@/components/library/FlashcardsCarousel";
import { CreateFlashcardDialog } from "@/components/library/CreateFlashcardDialog";

import { getSubject } from "@/services/subject/subject.service";

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
