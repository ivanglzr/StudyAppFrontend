"use client";

import { FormEvent, MouseEvent } from "react";

import { useFlashcardReducer } from "../hooks";
import { useAlertMessageStore } from "@/alert-message/store";

import { Label, Input, Button, DialogFooter } from "@/common/components/ui";
import { Trash } from "lucide-react";

import { validateFlashcardSchema } from "../schemas";

import { deleteFlashcard, postFlashcard, putFlashcard } from "../services";

import { ICreateFlashcard, IFlashcard } from "../interfaces";
import { ErrorSpan, FormGroup } from "@/common/components/forms";
import { useValidationErrors } from "@/common/hooks";

interface Props {
  initialFlashcard?: IFlashcard;
  subjectId: string;
  setIsOpen: (isOpen: boolean) => void;
}

export function FlashcardForm({
  initialFlashcard,
  subjectId,
  setIsOpen,
}: Props) {
  const {
    state: flashcard,
    setTitle,
    setLastAnswer,
    setLastTag,
    setLearned,
    addNewAnswer,
    addNewTag,
    deleteAnswer,
    deleteTag,
  } = useFlashcardReducer(initialFlashcard);

  const isEditFlashcard = initialFlashcard !== undefined;

  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const { errorMessages, updateErrorMessages } =
    useValidationErrors<ICreateFlashcard>({
      title: "",
      answers: [],
      tags: [],
      learned: false,
    });

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const message = await deleteFlashcard(subjectId, initialFlashcard!._id);

    setIsOpen(false);

    showAlert({
      title: "Success",
      message,
      variant: "default",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = validateFlashcardSchema(flashcard);

    if (error) {
      updateErrorMessages(error);

      return;
    }

    const message = isEditFlashcard
      ? await putFlashcard(subjectId, initialFlashcard._id, flashcard)
      : await postFlashcard(subjectId, data);

    setIsOpen(false);

    const alertMessageProps =
      message === undefined
        ? ({
            title: "Error",
            message: "An error ocurred",
            variant: "destructive",
          } as const)
        : ({
            title: "Success",
            message,
            variant: "default",
          } as const);

    showAlert(alertMessageProps);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <Label htmlFor="title" className="text-md">
          Flashcard title
        </Label>
        <Input
          name="title"
          placeholder="Title"
          id="title"
          value={flashcard.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ErrorSpan error={errorMessages.title} />
      </div>
      <div>
        <Label htmlFor="answer" className="text-md">
          Answer
        </Label>
        <Input
          name="answer"
          placeholder="Answer"
          id="answer"
          value={flashcard.answers[flashcard.answers.length - 1] ?? ""}
          onChange={(e) => setLastAnswer(e.target.value)}
        />
        <ErrorSpan error={errorMessages.answers} />
        <Button
          type="button"
          onClick={addNewAnswer}
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline"
        >
          Add answer
        </Button>
        {flashcard.answers[0] !== "" && flashcard.answers.length !== 0 && (
          <ul>
            <h4 className="underline">Answers</h4>
            {flashcard.answers.map((answer, index) => {
              if (answer === "") return;

              return (
                <li className="flex items-center" key={answer + index}>
                  <span>
                    {index + 1}. {answer}
                  </span>
                  <button onClick={() => deleteAnswer(index)}>
                    <Trash className="ml-4" color="#dd0000" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <Label htmlFor="tag" className="text-md">
          Tag
        </Label>
        <Input
          name="tag"
          placeholder="Tag"
          id="tag"
          value={flashcard.tags[flashcard.tags.length - 1] ?? ""}
          onChange={(e) => setLastTag(e.target.value)}
        />
        <ErrorSpan error={errorMessages.tags} />
        <Button
          type="button"
          onClick={addNewTag}
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline"
        >
          Add tag
        </Button>
        {flashcard.tags[0] !== "" && flashcard.tags.length !== 0 && (
          <div>
            <h4 className="underline">Tags</h4>
            <ul className="flex flex-wrap gap-4">
              {flashcard.tags.map((tag, index) => {
                if (tag === "") return;

                return (
                  <li className="flex items-center" key={tag + index}>
                    <span
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => deleteTag(index)}
                    >
                      #{tag}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Label htmlFor="learned">Learned</Label>
        <Input
          type="checkbox"
          className="w-4 h-4"
          name="learned"
          id="learned"
          checked={flashcard.learned}
          onChange={(e) => setLearned(e.target.checked)}
        />
        <ErrorSpan error={errorMessages.learned} />
      </div>
      <DialogFooter className="mt-4">
        {isEditFlashcard && (
          <Button
            type="button"
            variant="destructive"
            className="mr-auto"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
}
