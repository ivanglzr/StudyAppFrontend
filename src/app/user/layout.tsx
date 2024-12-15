import { SideBar } from "@/common/components/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1">
      <SideBar />
      <main className="bg-muted m-4 p-2 ml-24 rounded-lg overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
