import { create } from "zustand";

import { ISubject } from "@/interfaces/subject.interfaces";

interface Props {
  subjects: ISubject[];
}

interface Actions {
  getSubject: (index: number) => ISubject | undefined;
  setSubjects: (subjects: ISubject[]) => void;
  pushSubject: (subject: ISubject) => void;
  deleteSubject: (index: number) => void;
}

export const useSubjectsStore = create<Props & Actions>((set, get) => ({
  subjects: [],
  getSubject: (index: number) => {
    const { subjects } = get();

    if (index > subjects.length - 1 || subjects.length < 0) return;

    return subjects[index];
  },
  setSubjects: (subjects) => set({ subjects }),
  pushSubject: (subject) => set({ subjects: [...get().subjects, subject] }),
  deleteSubject: (index) => {
    const { subjects } = get();

    if (index > subjects.length - 1) return;

    subjects.splice(index, 1);

    set({ subjects });
  },
}));
