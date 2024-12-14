"use client";

import { useReducer } from "react";
import { FlashcardReducer } from "../reducers/flashcard.reducer";

import {
  EFlashcardReducerActions,
  ICreateFlashcard,
} from "../interfaces/flashcard.interfaces";

const initialFlashcard: ICreateFlashcard = {
  title: "",
  answers: [""],
  tags: [""],
  learned: false,
};

export function useFlashcardReducer(flashcard = initialFlashcard) {
  const [state, dispatch] = useReducer(FlashcardReducer, flashcard);

  const setTitle = (title: string) =>
    dispatch({ type: EFlashcardReducerActions.SET_TITLE, payload: title });

  const setLearned = (learned: boolean) =>
    dispatch({ type: EFlashcardReducerActions.SET_LEARNED, payload: learned });

  const setLastAnswer = (answer: string) =>
    dispatch({
      type: EFlashcardReducerActions.SET_LAST_ANSWER,
      payload: answer,
    });

  const setLastTag = (tag: string) =>
    dispatch({ type: EFlashcardReducerActions.SET_LAST_TAG, payload: tag });

  const addNewAnswer = () =>
    dispatch({
      type: EFlashcardReducerActions.ADD_NEW_ANSWER,
    });

  const addNewTag = () =>
    dispatch({ type: EFlashcardReducerActions.ADD_NEW_TAG });

  const setAnswers = (answers: string[]) =>
    dispatch({ type: EFlashcardReducerActions.SET_ANSWERS, payload: answers });

  const setTags = (tags: string[]) =>
    dispatch({ type: EFlashcardReducerActions.SET_TAGS, payload: tags });

  const deleteAnswer = (index: number) =>
    dispatch({ type: EFlashcardReducerActions.DELETE_ANSWER, payload: index });

  const deleteTag = (index: number) =>
    dispatch({ type: EFlashcardReducerActions.DELETE_TAG, payload: index });

  const deleteAnswers = () =>
    dispatch({ type: EFlashcardReducerActions.DELETE_ANSWERS });

  const deleteTags = () =>
    dispatch({ type: EFlashcardReducerActions.DELETE_TAGS });

  return {
    state,
    setTitle,
    setLearned,
    setLastAnswer,
    setLastTag,
    addNewAnswer,
    addNewTag,
    setAnswers,
    setTags,
    deleteAnswer,
    deleteTag,
    deleteAnswers,
    deleteTags,
  };
}
