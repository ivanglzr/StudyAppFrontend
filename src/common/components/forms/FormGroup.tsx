import { Input } from "@/common/components/ui";
import { Label } from "@/common/components/ui";
import { ErrorSpan } from "./ErrorSpan";

interface Props {
  type: React.HTMLInputTypeAttribute;
  inputName: string;
  label: string;
  placeholder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | readonly string[] | number | undefined;
  errorMessage: string | null;
}

export function FormGroup({
  type,
  inputName,
  label,
  placeholder,
  handleChange,
  value,
  errorMessage,
}: Props) {
  return (
    <div className="w-full mt-4">
      <Label className="text-sm" htmlFor={inputName}>
        {label}
      </Label>
      <Input
        type={type}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      <ErrorSpan error={errorMessage} />
    </div>
  );
}
