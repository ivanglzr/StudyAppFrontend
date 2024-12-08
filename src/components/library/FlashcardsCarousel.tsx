import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IFlashcard } from "@/interfaces/flashcard.interfaces";
import { FlashcardItem } from "./FlashcardItem";

interface Props {
  flashcards: IFlashcard[];
}

export function FlashcardsCarousel({ flashcards }: Props) {
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
            <FlashcardItem flashcard={flashcard} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
