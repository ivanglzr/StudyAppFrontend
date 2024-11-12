import Link from "next/link";

import { Button } from "../ui/button";

import { linkStyles } from "@/css/styles";

interface Props {
  children: React.ReactNode;
  title: string;
  buttonText: string;
  linkText: string;
  linkHref: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function Form({
  children,
  title,
  buttonText,
  linkText,
  linkHref,
  handleSubmit,
}: Props) {
  return (
    <form className="w-80 mx-auto my-4" onSubmit={handleSubmit}>
      <h1 className="my-4 text-center text-3xl">{title}</h1>
      {children}
      <Button type="submit" className="flex items-center my-4 text-xl">
        {buttonText}
      </Button>
      <Link href={linkHref} className={linkStyles}>
        {linkText}
      </Link>
    </form>
  );
}
