"use client";

import { FormEvent, useState } from "react";
import { useAlertMessageStore } from "@/alert-message/store";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/common/components/ui";
import { SubjectForm } from "./SubjectForm";

import { postSubject } from "../services";

import { validateCreateSubjectSchema } from "../schemas/subject.schemas";

export function CreateSubjectDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const { data, error } = validateCreateSubjectSchema(formData);

    if (error || !data) {
      setIsOpen(false);

      showAlert({
        title: "Error",
        message: error?.errors[0].message,
        variant: "destructive",
      });

      return;
    }

    const message = await postSubject(data);

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">Create subject</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Subject</DialogTitle>
          <DialogDescription>Create a new subject</DialogDescription>
        </DialogHeader>
        <SubjectForm handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
