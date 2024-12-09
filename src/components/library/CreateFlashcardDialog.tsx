"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { CreateFlashcardForm } from "./CreateFlashcardForm";

interface Props {
  subjectId: string;
}

export function CreateFlashcardDialog({ subjectId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">Create Flashcard</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Flashcard</DialogTitle>
          <DialogDescription>Create a new flashcard</DialogDescription>
        </DialogHeader>
        <CreateFlashcardForm subjectId={subjectId} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}