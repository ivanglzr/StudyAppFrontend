import { useState } from "react";

import type { ZodError } from "zod";

import { ErrorMessagesForInterface } from "@/lib/validation";

export function useValidationErrors<T extends object>(placeholder: T) {
  const [errorMessages, setErrorMessages] = useState<
    ErrorMessagesForInterface<T>
  >(placeholder as ErrorMessagesForInterface<T>);

  const updateErrorMessages = (
    error: ZodError<ErrorMessagesForInterface<T>>
  ) => {
    Object.keys(placeholder).map((key) => {
      const errorMessage =
        error.errors.find((error) => error.path.includes(key))?.message ?? null;

      setErrorMessages((prev) => ({
        ...prev,
        [key]: errorMessage,
      }));
    });
  };

  return { errorMessages, updateErrorMessages };
}
