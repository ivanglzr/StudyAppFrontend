import { Subjects, CreateSubjectDialog } from "@/subject/components";
import { Header } from "@/common/components/header";

import { getSubjects } from "@/subject/services";

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
