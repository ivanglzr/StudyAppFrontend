import { StudyTimeManager } from "@/components/StudyTimeManager";

export default function SubjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <StudyTimeManager />
    </>
  );
}
