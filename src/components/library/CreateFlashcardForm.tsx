"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";

import { useAlertMessageStore } from "@/store/alertMessage.store";
import { useFlashcardReducer } from "@/hooks/useFlashcardReducer.hook";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { postFlashcard } from "@/services/flashcard/flashcard.service";

import { validateFlashcardSchema } from "@/schemas/flashcard.schemas";

interface Props {
  subjectId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateFlashcardForm({ subjectId, setIsOpen }: Props) {
  const {
    state: flashcard,
    setTitle,
    setLastAnswer,
    addNewAnswer,
    deleteAnswer,
  } = useFlashcardReducer();

  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = validateFlashcardSchema(flashcard);

    if (error) {
      showAlert({
        title: "Error",
        message: error.errors[0].message,
        variant: "destructive",
      });

      return;
    }

    const message = await postFlashcard(subjectId, data);

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
      </div>
      <div>
        <Label htmlFor="answer" className="text-md">
          Answer
        </Label>
        <Input
          name="answer"
          placeholder="Answer"
          id="answer"
          value={flashcard.answers[flashcard.answers.length - 1]}
          onChange={(e) => setLastAnswer(e.target.value)}
        />
        <Button
          type="button"
          onClick={addNewAnswer}
          variant="ghost"
          className="px-0 mb-2 hover:bg-transparent hover:underline"
        >
          Add answer
        </Button>
        <ul>
          <h4 className="underline">Answers</h4>
          {flashcard.answers.map((answer, index) => {
            if (answer === "") return;

            return (
              <li className="ml-1 flex items-center" key={answer + index}>
                <span>{answer}</span>
                <button onClick={() => deleteAnswer(index)}>
                  <Trash className="ml-4" color="#dd0000" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
}
