import { ISubject } from "@/interfaces/subject.interfaces";

interface Props {
  subject: ISubject;
}

export function Subject({ subject }: Props) {
  //TODO: use shadcn/ui's card component (npx shadcn@latest add card)
  return (
    <article
      className={`bg-background px-4 py-2 rounded-lg border-t-8 border-t-[${subject.color}]`}
    >
      <h3 className="mb-2 text-2xl border-b-2 border-b-primary/50">
        {subject.subjectName}
      </h3>
      <div className="flex flex-col">
        <span>
          Flashcards: <strong>{subject.flashcards.length}</strong>
        </span>
        <span>
          Notes: <strong>{subject.notes.length}</strong>
        </span>
        <span>
          Exams: <strong>{subject.exams.length}</strong>
        </span>
      </div>
    </article>
  );
}
