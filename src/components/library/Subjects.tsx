import { Subject } from "./Subject";

import { ISubject } from "@/interfaces/subject.interfaces";

interface Props {
  subjects: ISubject[] | undefined;
}

export function Subjects({ subjects }: Props) {
  if (subjects === undefined)
    return <span>An error ocurred while loading the subjects</span>;

  if (subjects.length === 0)
    return <span>You don&apos;t have any subjects, create one!</span>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
      {subjects.map((subject) => (
        <Subject subject={subject} key={subject._id} />
      ))}
    </section>
  );
}
