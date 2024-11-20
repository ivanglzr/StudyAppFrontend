import { Subject } from "./Subject";

import { getSubjects } from "@/services/subject/subject.service";

export async function Library() {
  const subjects = await getSubjects();

  if (subjects === undefined)
    return <span>An error ocurred while loading the subjects</span>;

  if (subjects.length === 0)
    return <span>You don&apos;t have any subjects, create one!</span>;

  console.log(subjects[0]);

  return (
    <>
      <h1 className="m-2 mb-6 text-4xl text-primary border-b-2 border-b-primary/90 opacity-90">
        Subjects
      </h1>
      <section className="grid grid-cols-4 gap-4 mx-2">
        {subjects.map((subject) => (
          <Subject subject={subject} key={subject._id} />
        ))}
      </section>
    </>
  );
}
