import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AnswerSpoiler } from "./AnswerSpoiler";

import { IFlashcard } from "@/interfaces/flashcard.interfaces";

interface Props {
  flashcard: IFlashcard;
}

export function FlashcardItem({ flashcard }: Props) {
  return (
    <Card
      className={`border-2 border-dashed ${flashcard.learned ? "border-green-500" : "border-red-500"}`}
    >
      <CardContent className="h-36 lg:h-60 flex flex-col justify-center text-center">
        <h3 className="text-2xl">{flashcard.title}</h3>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h4 className="font-bold">Answer</h4>
        <AnswerSpoiler answers={flashcard.answers} />
      </CardFooter>
    </Card>
  );
}
