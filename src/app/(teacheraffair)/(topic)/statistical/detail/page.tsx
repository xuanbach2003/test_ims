'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const students = [
  {
    id: "21127000",
    name: "Nguyễn Văn A",
    email: "21127000@student.edu.vn",
    phone: "0912345678",
    major: "Công nghệ thông tin",
    class: "CNTT2025",
    gpa: 3.5,
    credits: 120,
    ongoingCourses: 10,
    failedCourses: 0,
    retakingCourses: 0,
    internship: {
      company: "FPT Software",
      position: "Software Developer Intern",
      location: "Quận 9, TP.HCM",
      project: "Phát triển phần mềm quản lý nhân sự",
      registrationDate: "15/2/2024",
      duration: "6 tháng",
      startDate: "1/7/2024",
      status: "Đã đăng ký",
    },
  },
];

export default function StudentDetailPage() {
  const router = useRouter();

  // Hiển thị sinh viên đầu tiên trong danh sách
  const student = students[0];

  return (
    <div className="p-6 space-y-6 bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold text-[#88b77b]">Thông tin chi tiết sinh viên</h1>
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-md">
        <div>
          <p className="text-sm text-gray-500">Mã số sinh viên</p>
          <p className="font-medium text-[#0e5243]">{student.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Chuyên ngành</p>
          <p className="font-medium text-[#0e5243]">{student.major}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Họ và tên</p>
          <p className="font-medium text-[#0e5243]">{student.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Lớp</p>
          <p className="font-medium text-[#0e5243]">{student.class}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-[#0e5243]">{student.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Số điện thoại</p>
          <p className="font-medium text-[#0e5243]">{student.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Điểm trung bình</p>
          <p className="font-medium text-[#0e5243]">{student.gpa}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Số tín chỉ tích lũy</p>
          <p className="font-medium text-[#0e5243]">{student.credits}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded-md text-center bg-green-100 text-green-700">
          <p className="text-sm">Đang học</p>
          <p className="font-medium text-lg">{student.ongoingCourses}</p>
        </div>
        <div className="p-4 border rounded-md text-center bg-yellow-100 text-yellow-700">
          <p className="text-sm">Môn không đạt</p>
          <p className="font-medium text-lg">{student.failedCourses}</p>
        </div>
        <div className="p-4 border rounded-md text-center bg-red-100 text-red-700">
          <p className="text-sm">Đang học lại</p>
          <p className="font-medium text-lg">{student.retakingCourses}</p>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold text-[#88b77b]">Thông tin đăng ký thực tập</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Công ty/Tổ chức</p>
            <p className="font-medium text-[#0e5243]">{student.internship.company}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Người hướng dẫn</p>
            <p className="font-medium text-[#0e5243]">Nguyễn Văn A</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Vị trí thực tập</p>
            <p className="font-medium text-[#0e5243]">{student.internship.position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Thời gian thực tập</p>
            <p className="font-medium text-[#0e5243]">{student.internship.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Đề tài/Dự án</p>
            <p className="font-medium text-[#0e5243]">{student.internship.project}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ngày bắt đầu</p>
            <p className="font-medium text-[#0e5243]">{student.internship.startDate}</p>
          </div>
        </div>
      </div>

      <Button
        onClick={() => router.back()}
        className="mt-6 bg-[#0e5243] text-white hover:bg-[#0c4639]"
      >
        Quay lại
      </Button>
    </div>
  );
}