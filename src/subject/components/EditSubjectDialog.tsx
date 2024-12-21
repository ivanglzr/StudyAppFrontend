"use client";

import { FormEvent, useState } from "react";
import { useAlertMessageStore } from "@/alert-message/store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/common/components/ui";
import { SubjectForm } from "./SubjectForm";
import { Edit } from "lucide-react";

import { putSubject } from "../services";

import { validateEditSubjectSchema } from "../schemas/subject.schemas";

import { ISubject } from "../interfaces";

interface Props {
  subject: ISubject;
}

export function EditSubjectDialog({ subject }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const { data, error } = validateEditSubjectSchema(formData);

    if (error || !data) {
      setIsOpen(false);

      showAlert({
        title: "Error",
        message: error?.errors[0].message,
        variant: "destructive",
      });

      return;
    }

    console.log(data);

    const message = await putSubject(subject._id, data);

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
        <button className="ml-auto">
          <Edit />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Subject</DialogTitle>
          <DialogDescription>Create a new subject</DialogDescription>
        </DialogHeader>
        <SubjectForm handleSubmit={handleSubmit} subject={subject} />
      </DialogContent>
    </Dialog>
  );
}
