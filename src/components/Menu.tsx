import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "Chức năng",
    items: [
      {
        icon: "/home.png",
        label: "Trang chủ",
        href: "/admin",
        visible: ["admin", "teacher", "student", "company"],
      },
      {
        icon: "/teacher.png",
        label: "Giáo vụ",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Sinh viên",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/business.png",
        label: "Doanh nghiệp",
        href: "/list/companies",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "Khác",
    items: [
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "company"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-SkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
