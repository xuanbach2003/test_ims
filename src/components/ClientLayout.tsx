"use client";

import { usePathname } from "next/navigation";
import NavbarAll from "@/components/NavbarAll";
import AdminNavbar from "@/components/AdminNavbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ẩn navbar ở những route không cần
  const hideNavbar = ["/login", "/reset-password", "/update-password"].includes(pathname);

  // Kiểm tra nếu là trang admin hoặc các trang con của admin
  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/list");

  return (
    <>
      {/* Render NavbarAll nếu không phải trang admin và không nằm trong hideNavbar */}
      {!hideNavbar && !isAdminPage && <NavbarAll />}

      {/* Render AdminNavbar nếu là trang admin hoặc các trang con */}
      {isAdminPage && <AdminNavbar />}

      {/* Nội dung chính */}
      <main>{children}</main>
    </>
  );
}