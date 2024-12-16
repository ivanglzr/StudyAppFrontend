import { IResponse } from "@/common/interfaces";

export interface IUser {
  email: string;
  fullname: string;
}

export interface IGetUserResponse extends IResponse {
  user: IUser;
}

export interface IChangePassword {
  password: string;
  newPassword: string;
}