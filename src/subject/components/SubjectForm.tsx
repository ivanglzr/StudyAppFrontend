import { FormEvent } from "react";

import { Button, DialogFooter, Input, Label } from "@/common/components/ui";

import { ICreateSubject } from "../interfaces";

interface Props {
  subject?: ICreateSubject;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const initialSubject = {
  subjectName: "",
  color: "",
};

export function SubjectForm({ subject = initialSubject, handleSubmit }: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <Label htmlFor="subjectName" className="text-md">
          Subject Name
        </Label>
        <Input
          name="subjectName"
          placeholder="Subject Name"
          id="subjectName"
          defaultValue={subject.subjectName}
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
          defaultValue={subject.color}
        />
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
}
