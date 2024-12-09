"use client";

import {
  EFlashcardReducerActions,
  ICreateFlashcard,
  TFlashcardReducerActionsType,
} from "@/interfaces/flashcard.interfaces";

export function FlashcardReducer(
  state: ICreateFlashcard,
  action: TFlashcardReducerActionsType
): ICreateFlashcard {
  const { type } = action;

  switch (type) {
    case EFlashcardReducerActions.SET_TITLE: {
      const title = action.payload;

      return { ...state, title };
    }

    case EFlashcardReducerActions.SET_LEARNED: {
      const learned = action.payload;

      return { ...state, learned };
    }

    case EFlashcardReducerActions.SET_LAST_ANSWER: {
      const answer = action.payload;

      const answers = [...state.answers];

      if (answer.length > 0) answers[answers.length - 1] = answer;
      else answers.push(answer);

      return { ...state, answers };
    }

    case EFlashcardReducerActions.SET_LAST_TAG: {
      const tag = action.payload;

      const tags = [...state.tags];

      if (tags.length > 0) tags[tags.length - 1] = tag;
      else tags.push(tag);

      return state;
    }

    case EFlashcardReducerActions.ADD_NEW_ANSWER: {
      return { ...state, answers: [...state.answers, ""] };
    }

    case EFlashcardReducerActions.ADD_NEW_TAG: {
      return { ...state, tags: [...state.tags, ""] };
    }

    case EFlashcardReducerActions.SET_ANSWERS: {
      const answers = action.payload;

      return { ...state, answers };
    }

    case EFlashcardReducerActions.SET_TAGS: {
      const tags = action.payload;

      return { ...state, tags };
    }

    case EFlashcardReducerActions.DELETE_ANSWER: {
      const index = action.payload;

      const answers = [...state.answers];

      answers.splice(index, 1);

      return { ...state, answers };
    }

    case EFlashcardReducerActions.DELETE_TAG: {
      const index = action.payload;

      const tags = [...state.tags];

      tags.splice(index, 1);

      return { ...state, tags };
    }

    case EFlashcardReducerActions.DELETE_ANSWERS:
      return { ...state, answers: [] };

    case EFlashcardReducerActions.DELETE_TAGS:
      return { ...state, tags: [] };

    default:
      return state;
  }
}
