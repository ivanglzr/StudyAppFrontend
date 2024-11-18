import Link from "next/link";

interface Props {
  icon: (color: string) => React.ReactNode;
  href: string;
  text: string;
  isActive: boolean;
}

export function LinkIcon({ icon, href, text, isActive }: Props) {
  const iconColor = isActive
    ? "hsl(var(--primary-foreground))"
    : "hsl(var(--primary))";

  const textColor = isActive ? "text-primary-foreground" : "text-primary";

  return (
    <Link
      href={href}
      className={`flex flex-col justify-center items-center p-2 rounded-lg ${
        isActive ? "bg-primary" : ""
      }`}
    >
      <div className="rounded-lg">{icon(iconColor)}</div>
      <span className={`text-sm opacity-90 whitespace-nowrap ${textColor}`}>
        {text}
      </span>
    </Link>
  );
}
