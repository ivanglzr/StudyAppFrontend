"use client";

import { useCallback, useRef, useState } from "react";
import { useValidationErrors } from "@/hooks/useValidationErrors";

import { Form } from "./Form";
import { FormGroup } from "./FormGroup";
import { Button } from "@/components/ui/button";

import { register } from "@/services/auth/auth.service";

import { validateRegisterSchema } from "@/lib/validation";

import { IRegister } from "@/interfaces/auth.interfaces";
import { useAlertMessageStore } from "@/store/alertMessage";

export function RegisterForm() {
  const showAlert = useAlertMessageStore((state) => state.showAlert);

  const [registerData, setRegisterData] = useState<IRegister>({
    email: "",
    password: "",
    fullname: "",
  });
  const { errorMessages, updateErrorMessages: setErrorMessages } =
    useValidationErrors<IRegister>({
      email: "",
      password: "",
      fullname: "",
    });

  const registerDataRef = useRef(registerData);
  registerDataRef.current = registerData;

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { data, error } = validateRegisterSchema(registerDataRef.current);

      if (error || !data) {
        setErrorMessages(error);
        return;
      }

      const message = await register(data);

      if (message)
        showAlert({ title: "Error", message, variant: "destructive" });
    },
    [setErrorMessages, showAlert]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.name) return;

    setRegisterData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form title="Register" handleSubmit={handleSubmit}>
      <FormGroup
        type="text"
        inputName="fullname"
        label="Fullname"
        placeholder="Fullname"
        handleChange={handleChange}
        value={registerData.fullname}
        errorMessage={errorMessages.fullname}
      />
      <FormGroup
        type="email"
        inputName="email"
        label="Email"
        placeholder="Email"
        handleChange={handleChange}
        value={registerData.email}
        errorMessage={errorMessages.email}
      />
      <FormGroup
        type="password"
        inputName="password"
        label="Password"
        placeholder="Password"
        handleChange={handleChange}
        value={registerData.password}
        errorMessage={errorMessages.password}
      />
      <Button type="submit" className="my-4 text-xl">
        Register
      </Button>
    </Form>
  );
}
