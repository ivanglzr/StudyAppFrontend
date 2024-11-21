import { IResponse } from "./response.interfaces";

import { ICreateFlashcard, IFlashcard } from "./flashcard.interfaces";
import { ICreateNote, INote } from "./note.interfaces";
import { ICreateExam, IExam } from "./exam.interfaces";

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

export interface ICreateSubject {
  subjectName: string;
  flashcards?: ICreateFlashcard[];
  notes?: ICreateNote[];
  exams?: ICreateExam[];
  color?: string;
}

export type IUpdateSubject = Partial<ICreateSubject>;

export interface IGetSubjectsResponse extends IResponse {
  subjects: ISubject[];
}

export interface IGetSubjectResponse extends IResponse {
  subject: ISubject;
}
