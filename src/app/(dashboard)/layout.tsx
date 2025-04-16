import AdminNavbar from "@/components/AdminNavbar";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-[#F7F8FA] overflow-scroll">
        {children}
      </div>
    </div>
  );
}