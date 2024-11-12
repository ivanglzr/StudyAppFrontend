"use client";

import { useCallback, useRef, useState } from "react";
import { useValidationErrors } from "@/hooks/useValidationErrors";

import { Form } from "./Form";
import { FormGroup } from "./FormGroup";
import { Button } from "@/components/ui/button";

import { logIn } from "@/services/auth/auth.service";

import { validateLogInSchema } from "@/lib/validation";

import { ILogIn } from "@/interfaces/auth.interfaces";

export function LoginForm() {
  const [loginData, setLoginData] = useState<ILogIn>({
    email: "",
    password: "",
  });
  const { errorMessages, updateErrorMessages: setErrorMessages } =
    useValidationErrors<ILogIn>({
      email: "",
      password: "",
    });

  const loginDataRef = useRef(loginData);
  loginDataRef.current = loginData;

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { data, error } = validateLogInSchema(loginDataRef.current);

      if (error || !data) {
        setErrorMessages(error);
        return;
      }

      await logIn(data);
    },
    [setErrorMessages]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.name) return;

    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form title="Log In" handleSubmit={handleSubmit}>
      <FormGroup
        type="email"
        inputName="email"
        label="Email"
        placeholder="Email"
        handleChange={handleChange}
        value={loginData.email}
        errorMessage={errorMessages.email}
      />
      <FormGroup
        type="password"
        inputName="password"
        label="Password"
        placeholder="Password"
        handleChange={handleChange}
        value={loginData.password}
        errorMessage={errorMessages.password}
      />
      <Button type="submit" className="my-4 text-xl">
        Log In
      </Button>
    </Form>
  );
}
