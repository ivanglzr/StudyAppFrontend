"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/common/components/ui";
import { FlashcardForm } from ".";
import { AddButton } from "@/common/components/buttons";
import { Edit } from "lucide-react";

import { IFlashcard } from "../interfaces";

interface Props {
  subjectId: string;
  flashcard?: IFlashcard;
}

export function FlashcardDialog({ subjectId, flashcard }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isEditFlashcard = flashcard !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEditFlashcard ? (
          <button className="absolute top-0 right-0 m-2">
            <Edit />
          </button>
        ) : (
          <AddButton text="Create Flashcard" />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditFlashcard ? "Edit a flashcard" : "Create a Flashcard"}
          </DialogTitle>
          <DialogDescription>
            {isEditFlashcard
              ? "Edit an existent flashcard"
              : "Create a new flashcard"}
          </DialogDescription>
        </DialogHeader>
        <FlashcardForm
          subjectId={subjectId}
          initialFlashcard={flashcard}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
