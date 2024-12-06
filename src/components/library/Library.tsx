import { CreateSubjectDialog } from "./CreateSubjectDialog";
import { Subjects } from "./Subjects";
import { Header } from "../header/Header";

import { getSubjects } from "@/services/subject/subject.service";

export async function Library() {
  const subjects = await getSubjects();

  return (
    <>
      <Header>
        <h1>Subjects</h1>
        <CreateSubjectDialog />
      </Header>
      <Subjects subjects={subjects} />
    </>
  );
}
