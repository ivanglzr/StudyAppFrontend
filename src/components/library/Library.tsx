import { Subject } from "./Subject";
import { CreateSubjectDialog } from "./CreateSubjectDialog";

import { getSubjects } from "@/services/subject/subject.service";

export async function Library() {
  const subjects = await getSubjects();

  if (subjects === undefined)
    return <span>An error ocurred while loading the subjects</span>;

  if (subjects.length === 0)
    return <span>You don&apos;t have any subjects, create one!</span>;

  return (
    <>
      <header className="flex m-2 mb-6 text-4xl border-b-2 border-b-foreground/75 opacity-90">
        <h1>Subjects</h1>
        <CreateSubjectDialog />
      </header>
      <section className="grid grid-cols-4 gap-4 mx-2">
        {subjects.map((subject) => (
          <Subject subject={subject} key={subject._id} />
        ))}
      </section>
    </>
  );
}
