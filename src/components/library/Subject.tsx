import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ISubject } from "@/interfaces/subject.interfaces";

interface Props {
  subject: ISubject;
}

export function Subject({ subject }: Props) {
  return (
    <Card className="border-t-4" style={{ borderTopColor: subject.color }}>
      <CardHeader>
        <CardTitle className="text-2xl">{subject.subjectName}</CardTitle>
        <CardDescription>
          <span>
            Notes: <strong>{subject.notes.length}</strong>
          </span>{" "}
          <strong>·</strong>{" "}
          <span>
            Flashcards: <strong>{subject.flashcards.length}</strong>
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button style={{ backgroundColor: subject.color }}>Study</Button>
      </CardFooter>
    </Card>
  );
}
