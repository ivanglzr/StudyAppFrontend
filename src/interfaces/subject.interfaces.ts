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
  _id: string;
}

export interface IGetSubjectsResponse extends IResponse {
  subjects: ISubject[];
}

export interface IGetSubjectResponse extends IResponse {
  subject: ISubject;
}
