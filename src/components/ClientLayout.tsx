"use client";

import { usePathname } from "next/navigation";
import NavbarWorkspace from "@/components/NavbarAll";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ẩn navbar ở những route không cần
  const hideNavbar = ["/login", "/reset-password", "/update-password"].includes(pathname);

  return (
    <>
      {!hideNavbar && <NavbarWorkspace />}
      <main>{children}</main>
    </>
  );
}
