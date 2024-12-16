"use client";

import { useCallback, useRef, useState } from "react";
import { useValidationErrors } from "@/common/hooks";
import { useAlertMessageStore } from "@/alert-message/store";

import { Form, FormGroup } from "@/common/components/forms";

import { logIn } from "@/auth/services";

import { validateLogInSchema } from "@/auth/schemas";

import { ILogIn } from "@/auth/interfaces";

import { ROUTES } from "@/config";

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
    <Form
      title="Log In"
      buttonText="Log in"
      linkText="Don't have an account? Register"
      linkHref={ROUTES.REGISTER}
      handleSubmit={handleSubmit}
    >
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
    </Form>
  );
}