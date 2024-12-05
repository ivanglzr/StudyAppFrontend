import { CreateSubjectDialog } from "./CreateSubjectDialog";

import { getSubjects } from "@/services/subject/subject.service";
import { Subjects } from "./Subjects";

export async function Library() {
  const subjects = await getSubjects();

  return (
    <>
      <header className="flex m-2 mb-6 text-4xl border-b-2 border-b-foreground/75 opacity-90">
        <h1>Subjects</h1>
        <CreateSubjectDialog />
      </header>
      <Subjects subjects={subjects} />
    </>
  );
}
