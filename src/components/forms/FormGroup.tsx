import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  type: React.HTMLInputTypeAttribute;
  inputName: string;
  label: string;
  placeholder?: string;
}

export function FormGroup({ type, inputName, label, placeholder }: Props) {
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
      />
    </div>
  );
}
