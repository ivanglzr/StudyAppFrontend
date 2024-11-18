export interface IFlashcard {
  title: string;
  tags: string[];
  answers: string[];
  learned: boolean;
  _id: string;
}

export type ICreateFlashcard = Omit<IFlashcard, "_id">;

export type IUpdateFlashcard = Partial<ICreateFlashcard>;
