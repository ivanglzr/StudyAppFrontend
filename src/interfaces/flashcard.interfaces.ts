export interface IFlashcard {
  title: string;
  tags: string[];
  answers: string[];
  learned: boolean;
  _id: string;
}

export type ICreateFlashcard = Omit<IFlashcard, "_id">;

export type IUpdateFlashcard = Partial<ICreateFlashcard>;

export enum EFlashcardReducerActions {
  SET_TITLE = "SET_TITLE",
  SET_LAST_ANSWER = "SET_LAST_ANSWER",
  ADD_NEW_ANSWER = "SET_NEW_ANSWER",
  SET_ANSWERS = "SET_ANSWERS",
  SET_LAST_TAG = "SET_LAST_TAG",
  ADD_NEW_TAG = "SET_NEW_TAG",
  SET_TAGS = "SET_TAGS",
  SET_LEARNED = "SET_LEARNED",
  DELETE_ANSWER = "DELETE_ANSWER",
  DELETE_ANSWERS = "DELETE_ANSWERS",
  DELETE_TAG = "DELETE_TAG",
  DELETE_TAGS = "DELETE_TAGS",
}

export type TFlashcardReducerActionsType =
  | { type: EFlashcardReducerActions.SET_TITLE; payload: string }
  | { type: EFlashcardReducerActions.SET_LAST_ANSWER; payload: string }
  | { type: EFlashcardReducerActions.ADD_NEW_ANSWER }
  | { type: EFlashcardReducerActions.SET_ANSWERS; payload: string[] }
  | { type: EFlashcardReducerActions.SET_LAST_TAG; payload: string }
  | { type: EFlashcardReducerActions.ADD_NEW_TAG }
  | { type: EFlashcardReducerActions.SET_TAGS; payload: string[] }
  | { type: EFlashcardReducerActions.SET_LEARNED; payload: boolean }
  | { type: EFlashcardReducerActions.DELETE_ANSWER; payload: number }
  | { type: EFlashcardReducerActions.DELETE_ANSWERS }
  | { type: EFlashcardReducerActions.DELETE_TAG; payload: number }
  | { type: EFlashcardReducerActions.DELETE_TAGS };
