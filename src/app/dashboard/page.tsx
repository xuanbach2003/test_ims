'use client';

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const handleLogOut = (router: ReturnType<typeof useRouter>) => {
  localStorage.removeItem("role");
  router.push("/login");
}

const Dashboard = () => {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  let vietnamese_role: string = "";

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      router.push("/login");
    } else {
      setRole(storedRole);
    }
  }, [router]);

  const student_cards = [
    {
      title: "Thông Tin Cá Nhân",
      description: "Xem và cập nhật một vài thông tin cá nhân của sinh viên.",
    },
    {
      title: "Đăng Ký Đề Tài",
      description: "Cho phép sinh viên đăng ký đề tài trực tuyến.",
    },
    {
      title: "Đánh Giá Doanh Nghiêp",
      description: "Cho phép sinh viên khảo sát đánh giá chất lượng của doanh nghiệp.",
    },
    {
      title: "Kết Quả Thực Tập",
      description:
        "Cho phép sinh viên xem kết quả thực tập, kết quả là đánh giá của doanh nghiệp và giảng viên.",
    },
    {
      title: "Xem Lịch Vấn Đáp",
      description: "Cho phép sinh viên xem lịch vấn đáp với giảng viên.",
    },
    {
      title: "Hỗ Trợ Hỏi Đáp",
      description:
        "Cho phép sinh viên hỏi đáp các vấn đề liên quan đến quá trình thực tập.",
    },
  ];

  const teacher_teacher_cards = [
    {
      title: "Thông Tin Cá Nhân",
      description: "Xem và cập nhật một vài thông tin cá nhân của giảng viên.",
    },
    {
      title: "Chấm Điểm Đề Tài",
      description: "Cho phép giảng viên chấm điểm đề tài của sinh viên.",
    },
    {
      title: "Đăng Kí Vấn Đáp",
      description: "Cho phép giảng viên đăng ký thời gian rảnh để sắp lịch vấn đáp.",
    },
    {
      title: "Tìm Kiếm Lịch Vấn Đáp",
      description: "Tìm kiếm lịch vấn đáp giữa giảng viên và sinh viên.",
    },
    {
      title: "Xem Đề Tài Được Phân Công",
      description:
        "Cho phép giảng viên xem đề tài được phân công cho mình.",
    },
    {
      title: "Hỗ Trợ Hỏi Đáp",
      description:
        "Cho phép giảng viên hỏi đáp các vấn đề liên quan đến quá trình thực tập.",
    },
  ];

  const teacher_affair_cards = [
    {
      title: "Thông Tin Cá Nhân",
      description: "Xem và cập nhật một vài thông tin cá nhân của giáo vụ.",
    },
    {
      title: "Thống Kê Danh Sách Sinh Viên Đủ Điều Kiện",
      description: "Cho phép giáo vụ thống kê sinh viên đủ điều kiện ứng tuyển.",
    },
    {
      title: "Thống Kê Danh Sách Sinh Viên Đạt Ứng Tuyển",
      description: "Cho phép giáo vụ thống kê sinh viên đạt ứng tuyển.",
    },
    {
      title: "Quản Lí Tiêu Chí Chấm Điểm",
      description: "Cho phép giáo vụ quản lý tiêu chí chấm điểm.",
    },
    {
      title: "Lập Lịch Vấn Đáp Tự Động",
      description: "Cho phép giáo vụ lập lịch vấn đáp tự động giữa giảng viên và sinh viên.",
    },
    {
      title: "Quản Lý Doanh Nghiệp",
      description:
        "Cho phép giáo vụ quản lý doanh nghiệp.",
    },
    {
      title: "Duyệt Đề Tài",
      description:
        "Cho phép giáo vụ duyệt đề tài.",
    },
    {
      title: "Phân Công Giảng Viên Chấm Điểm Đề Tài", 
      description:
        "Cho phép giáo vụ phân công giảng viên chấm điểm cho đề tài.",
    },
    {
      title: "Hỗ Trợ Hỏi Đáp",
      description:
        "Cho phép giáo vụ hỏi đáp các vấn đề liên quan đến quá trình thực tập.",
    },
  ];

  const company_cards = [
    {
      title: "Thông Tin Cá Nhân",
      description: "Xem và cập nhật một vài thông tin cá nhân của doanh nghiệp.",
    },
    {
      title: "Đăng Tin Tuyển Dụng",
      description: "Cho phép doanh nghiệp đăng tin tuyển dụng.",
    },
    {
      title: "Xem Trạng Thái Đề Tài",
      description: "Cho phép doanh nghiệp xem trạng thái của đề tài đã đăng.",
    },
    {
      title: "Xem Danh Sách Đề Tài Ứng Tuyển",
      description: "Cho phép doanh nghiệp xem danh sách đề tài ứng tuyển.",
    },
    {
      title: "Đánh Giá Sinh Viên",
      description: "Cho phép doanh nghiệp đánh giá sinh viên.",
    },
    {
      title: "Xem Thống Kê Thực Tập",
      description:
        "Cho phép doanh nghiêp xem thống kê thực tập",
    },
    {
      title: "Xem Đề Tài Đang Thực Hiện",
      description:
        "Cho phép doanh nghiêp xem những đề tài nào đang được thực hiện",
    },
    {
      title: "Hỗ Trợ Hỏi Đáp",
      description:
        "Cho phép giáo vụ hỏi đáp các vấn đề liên quan đến quá trình thực tập.",
    },
  ];
  
  const admin_cards = [
    {
      title: "Thông Tin Cá Nhân",
      description: "Xem và cập nhật một vài thông tin cá nhân của admin.",
    },
    {
      title: "Quản Lý Tài Khoản",
      description: "Cho phép admin quản lý tài khoản người dùng hệ thống.",
    },
  ];

  let final_cards: { title: string; description: string }[] = [];
  switch (role) {
    case "ROLE_STUDENT":
      final_cards = student_cards;
      vietnamese_role = "SINH VIÊN"
      break;
    case "ROLE_TEACHER_TYPE_TEACHER":
      final_cards = teacher_teacher_cards;
      vietnamese_role = "GIẢNG VIÊN"
      break;
    case "ROLE_TEACHER_TYPE_AFFAIR":
      final_cards = teacher_affair_cards;
      vietnamese_role = "GIÁO VỤ"
      break;
    case "ROLE_COMPANY":
      final_cards = company_cards;
      vietnamese_role = "DOANH NGHIỆP"
      break;
    case "ROLE_ADMIN":
      final_cards = admin_cards;
      vietnamese_role = "ADMIN"
      break;
    default:
      break;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center bg-blue-400">
          <h1 className="text-2xl font-bold text-gray-800">{vietnamese_role}</h1>
          <Button
            size={"sm"}
            onClick={() => handleLogOut(router)}
            className="text-gray-500 cursor-pointer bg-blue-200 ml-4"
          >
            Đăng Xuất
          </Button>
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-gray-600">🏠</span>
            <Button
              size={"sm"}
              className="text-gray-500 cursor-pointer bg-blue-200"
              onClick={() => router.push("/")}
            >
              Trang Chủ
            </Button>
          </div>
        </div>
      </header>
      <main className={`container mx-auto px-4 py-8 mt-${final_cards.length === 2 ? '30' : final_cards.length === 9 ? '6' : final_cards.length === 8 ? '6' : '16'}`}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${final_cards.length > 2 ? '3' : '2'} gap-6`}>
          {final_cards.map((card, index) => (
            <Card key={index} className="py-7 bg-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
                <CardDescription className="text-sm text-blue-200">
                  {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
