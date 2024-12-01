import { ISubject } from "./subject.interfaces";

import { IResponse } from "./response.interfaces";

export interface ISubjectFlashcardsStats {
  subject: ISubject;
  subjectId: string;
  learnedFlashcardsPercentage: number;
  totalFlashcards: number;
  learnedFlashcards: number;
}

export interface IFlashcardStats {
  learnedFlashcardsPercentage: number;
  totalFlashcards: number;
  learnedFlashcards: number;
  subjectsFlashcardsStats: ISubjectFlashcardsStats[];
}

export interface ISubjectStats {
  subjectId: string;
  subject: ISubject;
  studyTime: number;
}

export interface IStats {
  userId: string;
  totalTime: number;
  flashcardStats: IFlashcardStats;
  subjectsStats: ISubjectStats[];

  _id: string;
}

export interface IGetStatsResponse extends IResponse {
  stats: IStats;
}

export interface IGetSubjectsStatsResponse extends IResponse {
  stats: ISubjectStats[];
}
