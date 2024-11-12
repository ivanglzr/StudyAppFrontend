"use client";

import { useCallback, useRef, useState } from "react";
import { useValidationErrors } from "@/hooks/useValidationErrors";
import { useAlertMessageStore } from "@/store/alertMessage";

import { Form } from "./Form";
import { FormGroup } from "./FormGroup";
import { Button } from "@/components/ui/button";

import { logIn } from "@/services/auth/auth.service";

import { validateLogInSchema } from "@/lib/validation";

import { ILogIn } from "@/interfaces/auth.interfaces";

export function LoginForm() {
  const showAlert = useAlertMessageStore((state) => state.showAlert);

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

      const message = await logIn(data);

      if (message)
        showAlert({ title: "Error", message, variant: "destructive" });
    },
    [setErrorMessages, showAlert]
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
