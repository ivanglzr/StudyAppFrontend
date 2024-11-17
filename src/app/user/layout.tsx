import { SideBar } from "@/components/sidebar/SideBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-[80px_auto]">
      <SideBar />
      <main className="bg-muted m-4 p-2 rounded-lg">{children}</main>
    </div>
  );
}
