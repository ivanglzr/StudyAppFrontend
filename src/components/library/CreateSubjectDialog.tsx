"use client";

import { FormEvent, useState } from "react";
import { useAlertMessageStore } from "@/store/alertMessage.store";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { postSubject } from "@/services/subject/subject.service";

import { ICreateSubject } from "@/interfaces/subject.interfaces";

export function CreateSubjectDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const message = await postSubject(data as unknown as ICreateSubject);

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
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <Label htmlFor="subjectName" className="text-md">
              Subject Name
            </Label>
            <Input
              name="subjectName"
              placeholder="Subject Name"
              id="subjectName"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="color" className="text-md">
              Color
            </Label>
            <input
              type="color"
              name="color"
              className="h-10 border bg-primary border-primary"
              id="color"
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
