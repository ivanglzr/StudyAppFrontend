export interface ILogIn {
  email: string;
  password: string;
}

export interface IRegister extends ILogIn {
  fullname: string;
}
