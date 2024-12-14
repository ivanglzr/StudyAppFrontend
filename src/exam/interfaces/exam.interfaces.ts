export interface IExam {
  title: string;
  date: Date;
  _id: string;
}

export type ICreateExam = Omit<IExam, "_id">;

export type IUpdateExam = Partial<ICreateExam>;
