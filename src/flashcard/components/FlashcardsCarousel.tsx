import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/common/components/ui";
import { FlashcardItem } from "./FlashcardItem";

import { IFlashcard } from "../interfaces/flashcard.interfaces";

interface Props {
  flashcards: IFlashcard[];
  subjectId: string;
}

export function FlashcardsCarousel({ flashcards, subjectId }: Props) {
  if (flashcards.length === 0)
    return <span>You don't have any flashcards!</span>;

  return (
    <Carousel
      opts={{
        align: "center",
      }}
    >
      <CarouselContent>
        {flashcards.map((flashcard) => (
          <CarouselItem
            key={flashcard._id}
            className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
          >
            <FlashcardItem flashcard={flashcard} subjectId={subjectId} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
