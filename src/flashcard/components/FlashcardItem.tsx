import { Card, CardContent, CardFooter } from "@/common/components/ui";
import { AnswerSpoiler } from "./AnswerSpoiler";
import { FlashcardDialog } from "./FlashcardDialog";

import { IFlashcard } from "../interfaces/flashcard.interfaces";

interface Props {
  flashcard: IFlashcard;
  subjectId: string;
}

export function FlashcardItem({ flashcard, subjectId }: Props) {
  return (
    <Card
      className={`relative border-2 border-dashed ${flashcard.learned ? "border-green-500" : "border-red-500"}`}
    >
      <CardContent className="h-36 lg:h-60 flex flex-col justify-center text-center">
        <h3 className="text-2xl">{flashcard.title}</h3>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h4 className="font-bold">Answer</h4>
        <AnswerSpoiler answers={flashcard.answers} />
      </CardFooter>
      <FlashcardDialog subjectId={subjectId} flashcard={flashcard} />
    </Card>
  );
}
