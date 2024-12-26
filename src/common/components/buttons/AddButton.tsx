import { ButtonHTMLAttributes, forwardRef } from "react";

import { Plus } from "lucide-react";
import { Button } from "../ui";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const AddButton = forwardRef<HTMLButtonElement, Props>(
  ({ text, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`ml-auto ${className}`}
        role="button"
        aria-label="Button to create or edit a resource"
        {...props}
      >
        <span className="hidden sm:inline-block">{text}</span>
        <Plus className="inline-block sm:hidden" width={40} height={40} />
      </Button>
    );
  }
);

AddButton.displayName = "AddButton";
