import { IResponse } from "./response.interfaces";

import { IFlashcard } from "./flashcard.interfaces";
import { INote } from "./note.interfaces";
import { IExam } from "./exam.interfaces";

export interface ISubject {
  userId: string;
  subjectName: string;
  flashcards: IFlashcard[];
  notes: INote[];
  exams: IExam[];
  documents: string[];
  color: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export type ICreateSubject = Omit<
  ISubject,
  "_id" | "createdAt" | "updatedAt" | "userId" | "color"
> &
  Partial<Pick<ISubject, "color">>;

export type IUpdateSubject = Partial<ICreateSubject>;

export interface IGetSubjectsResponse extends IResponse {
  subjects: ISubject[];
}

export interface IGetSubjectResponse extends IResponse {
  subject: ISubject;
}
