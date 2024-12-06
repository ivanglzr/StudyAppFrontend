import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ISubject } from "@/interfaces/subject.interfaces";

function getContrastColor(hex: string) {
  // Convertir el color HEX a RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Calcular la luminosidad
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Retornar blanco o negro basado en la luminosidad
  return luminance > 128 ? "hsl(var(--foreground))" : "hsl(var(--background))";
}

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
        <Button
          style={{
            backgroundColor: subject.color,
            color: getContrastColor(subject.color),
          }}
        >
          Study
        </Button>
      </CardFooter>
    </Card>
  );
}
