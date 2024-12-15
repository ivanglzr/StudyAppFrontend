export interface INote {
  title: string;
  content: string;
  _id: string;
}

export type ICreateNote = Omit<INote, "_id">;

export type IUpdateNote = Partial<ICreateNote>;
