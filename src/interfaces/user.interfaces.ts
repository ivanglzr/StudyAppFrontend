import { IResponse } from "./response.interfaces";

export interface IUser {
  email: string;
  fullname: string;
}

export interface IGetUserResponse extends IResponse {
  user: IUser;
}
