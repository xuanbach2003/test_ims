'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = (menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const toggleAvatarDropdown = () => {
    setAvatarDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      title: 'Trang chủ',
      href: '/admin',
    },
    {
      title: 'Quản lý sinh viên',
      href: '/list/students',
    },
    {
      title: 'Quản lý doanh nghiệp',
      href: '/list/companies',
    },
    {
      title: 'Quản lý giảng viên',
      href: '/list/teachers',
    },
  ];

  return (
    <nav className="bg-[#0e5243] shadow px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image
          src="/logo.png"
          alt="IMS Logo"
          width={32}
          height={32}
        />
        Admin Dashboard
      </div>

      {/* Menu ngang */}
      <div className="flex items-center gap-8">
        {menuItems.map((menu) => (
          <Link
            key={menu.title}
            href={menu.href}
            className="text-white hover:text-gray-300 text-sm font-medium"
          >
            {menu.title}
          </Link>
        ))}
      </div>

      {/* Avatar dropdown */}
      <div className="relative" ref={avatarRef}>
        <Image
          src="/avatar.png"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full object-cover cursor-pointer"
          onClick={toggleAvatarDropdown}
        />
        {avatarDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <button
                onClick={() => {
                  handleLogout(); // Gọi hàm handleLogout
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;