import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/common/components/ui";
import { EditSubjectDialog } from "./EditSubjectDialog";

import { ISubject } from "../interfaces";

import { ROUTES } from "@/config";

function getContrastColor(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 128 ? "#000000" : "#FFFFFF";
}

interface Props {
  subject: ISubject;
}

export function Subject({ subject }: Props) {
  return (
    <Card className="border-t-4" style={{ borderTopColor: subject.color }}>
      <CardHeader className="grid grid-cols-2">
        <CardTitle className="text-2xl">{subject.subjectName}</CardTitle>
        <EditSubjectDialog subject={subject} />
        <CardDescription className="flex gap-2">
          <span className="flex gap-1">
            Notes: <strong>{subject.notes.length}</strong>
          </span>
          <strong>·</strong>
          <span className="flex gap-1">
            Flashcards: <strong>{subject.flashcards.length}</strong>
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={ROUTES.SUBJECT_PAGE(subject._id)}>
          <Button
            style={{
              backgroundColor: subject.color,
              color: getContrastColor(subject.color),
            }}
          >
            Study
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
