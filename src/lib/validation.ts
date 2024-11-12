import { z } from "zod";

import { ILogIn, IRegister } from "@/interfaces/auth.interfaces";

export type ErrorMessagesForInterface<T extends object> = {
  [K in keyof T]: string | null;
};

const passwordRegex =
  /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*\d){1,})(?=(.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]){1,}).{8,}$/;

const fullnameSchema = z
  .string({
    required_error: "Fullname is required",
    invalid_type_error: "Fullname must be an string",
  })
  .min(1, "Fullname can't be empty")
  .min(2, "Fullname must be atleast 2 characters long")
  .max(50, "Fullname can't have more than 50 characters");

const emailSchema = z
  .string({
    invalid_type_error: "Email must be a string",
    required_error: "Email is required",
  })
  .email("Email isn't valid")
  .min(1, "Email can't be empty")
  .min(5, "Email must be atleast 5 characters long")
  .max(50, "Email can't have more than 50 characters");

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be an string",
  })
  .min(1, "Password can't be empty")
  .min(8, "Password must be atleast 8 characters long")
  .max(50, "Password can't have more than 50 characters")
  .regex(
    passwordRegex,
    "Password must have 2 uppercase letters, 2 lowercase letters, 2 numbers and a symbol"
  );

const logInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const registerSchema = z.object({
  fullname: fullnameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const validateLogInSchema = (loginData: ILogIn) =>
  logInSchema.safeParse(loginData);

export const validateRegisterSchema = (registerData: IRegister) =>
  registerSchema.safeParse(registerData);
