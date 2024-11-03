export interface IResponse {
  statusCode: number;
  message: string;
}

export interface IBadResponse extends IResponse {
  error: string;
}
