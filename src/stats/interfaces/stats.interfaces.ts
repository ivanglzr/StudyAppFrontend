import { ISubject } from "@/subject/interfaces";

import { IResponse } from "@/common/interfaces";

export interface ISubjectFlashcardsStats {
  subject: ISubject;
  subjectId: string;
  learnedFlashcardsPercentage: number;
  totalFlashcards: number;
  learnedFlashcards: number;
}

export interface IFlashcardsStats {
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
  flashcardsStats: IFlashcardsStats;
  subjectsStats: ISubjectStats[];

  _id: string;
}

export interface IGetStatsResponse extends IResponse {
  stats: IStats;
}

export interface IGetSubjectsStatsResponse extends IResponse {
  stats: ISubjectStats[];
}
