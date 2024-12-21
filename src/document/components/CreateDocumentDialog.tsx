"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useAlertMessageStore } from "@/alert-message/store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  Button,
  DialogFooter,
  Input,
  Label,
} from "@/common/components/ui";

import { postDocument } from "../services";

interface Props {
  subjectId: string;
}

export function CreateDocumentDialog({ subjectId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const [newFile] = files;

    setFile(newFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;

    const message = await postDocument(subjectId, file);

    if (message) showAlert({ title: "Success", message, variant: "default" });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">Upload document</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>Create a new flashcard</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col">
            <Label htmlFor="file" className="text-xl">
              File
            </Label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
