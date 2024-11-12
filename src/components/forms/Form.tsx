interface Props {
  children: React.ReactNode;
  title: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function Form({ children, title, handleSubmit }: Props) {
  return (
    <form className="w-80 mx-auto my-4" onSubmit={handleSubmit}>
      <h1 className="my-4 text-center text-3xl">{title}</h1>
      {children}
    </form>
  );
}
