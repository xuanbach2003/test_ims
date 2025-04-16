'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NavBarAll = () => {
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
      title: 'Giáo vụ',
      items: [
        { label: 'Hồ sơ', href: '/teacher/profile' },
        { label: 'Lịch làm việc', href: '/teacher/schedule' },
      ],
    },
    {
      title: 'Doanh nghiệp',
      items: [
        { label: 'Thông tin DN', href: '/company/info' },
        { label: 'Đăng tuyển', href: '/company/jobs' },
      ],
    },
    {
      title: 'Sinh viên',
      items: [
        { label: 'Thông tin', href: '/student/info' },
        { label: 'Thực tập', href: '/student/internship' },
      ],
    },
  ];

  return (
    <nav className="bg-[#0e5243] shadow px-6 py-4 flex items-center justify-between ">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
      <Image
    src="/logo.png" 
    alt="IMS Logo"
    width={32}
    height={32}
  />
        IMS</div>

      {/* Menu ngang */}
      <div className="flex items-center gap-8 relative bg-background:bg-[#88b77b]">
        {menuItems.map((menu) => (
          <div key={menu.title} className="relative">
            <button
              onClick={() => toggleDropdown(menu.title)}
              className="flex items-center gap-1 text-white hover:text-black text-sm font-medium"
            >
              {menu.title}
              <ChevronDown size={16} />
            </button>

            {activeDropdown === menu.title && (
              <div className="absolute top-10 left-0 bg-white border rounded shadow w-40 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  {menu.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
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

export default NavBarAll;
