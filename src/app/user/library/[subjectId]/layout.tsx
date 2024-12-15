import { StudyTimeManager } from "@/common/components";

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
