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
    setLastTag,
    setLearned,
    addNewAnswer,
    addNewTag,
    deleteAnswer,
    deleteTag,
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
          value={flashcard.answers[flashcard.answers.length - 1] ?? ""}
          onChange={(e) => setLastAnswer(e.target.value)}
        />
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
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
}
