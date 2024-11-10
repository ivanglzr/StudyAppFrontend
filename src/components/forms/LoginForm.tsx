"use client";

import { FormGroup } from "./FormGroup";

import { Button } from "@/components/ui/button";

export function LoginForm() {
  //TODO: call the login server action and validate all data
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="w-80 mx-auto my-4" onSubmit={handleSubmit}>
      <h1 className="my-4 text-center text-3xl">Log In</h1>
      <FormGroup
        type="email"
        inputName="email"
        label="Email"
        placeholder="Email"
      />
      <FormGroup
        type="password"
        inputName="password"
        label="Password"
        placeholder="Password"
      />
      <Button type="submit" className="my-4 text-xl">
        Log In
      </Button>
    </form>
  );
}
