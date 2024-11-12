interface Props {
  error: string | null;
}

export function ErrorSpan({ error }: Props) {
  if (!error) return;

  return <span className="block mt-2 text-sm text-red-500">{error}</span>;
}
