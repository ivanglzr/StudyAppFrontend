interface Props {
  children: React.ReactNode;
}

export function Header({ children }: Props) {
  return (
    <header className="flex m-2 mb-6 text-4xl border-b-2 border-b-foreground/75 opacity-90">
      {children}
    </header>
  );
}
