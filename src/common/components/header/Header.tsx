interface Props {
  children: React.ReactNode;
}

export function Header({ children }: Props) {
  return (
    <header className="flex mt-2 mb-4 sm:mb-6 pb-2 sm:pb-0 text-3xl sm:text-4xl border-b-2 border-b-foreground/75 opacity-90">
      {children}
    </header>
  );
}
