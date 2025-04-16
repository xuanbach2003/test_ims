'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  gpa: number;
  credits: number;
  status: string;
}

const students: Student[] = [
  { id: "21127011", name: "Nguyễn Văn A", gpa: 3.5, credits: 120, status: "Đã đăng ký" },
  { id: "SV002", name: "Trần Thị B", gpa: 3.2, credits: 115, status: "Chưa đăng ký" },
  { id: "SV003", name: "Lê Văn C", gpa: 2.8, credits: 100, status: "Đã đăng ký" },
  { id: "SV004", name: "Phạm Thị D", gpa: 2.5, credits: 90, status: "Chưa đăng ký" },
];

export default function StatisticalPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    minGpa: 2.5,
    minCredits: 100,
    status: "Tất cả",
  });

  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleStatusChange = (value: string) => {
    setFilters({ ...filters, status: value });
  };

  const applyFilters = () => {
    const filtered = students.filter((student) => {
      const meetsGpa = student.gpa >= Number(filters.minGpa);
      const meetsCredits = student.credits >= Number(filters.minCredits);
      const meetsStatus =
        filters.status === "Tất cả" || student.status === filters.status;

      return meetsGpa && meetsCredits && meetsStatus;
    });

    if (filtered.length === 0) {
      toast.error("Không có sinh viên nào thỏa mãn tiêu chí!");
    }

    setFilteredStudents(filtered);
  };

  const exportData = (type: "excel" | "pdf") => {
    toast.success(`Xuất danh sách sinh viên dưới dạng ${type.toUpperCase()} thành công!`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#88b77b]">Thống kê danh sách sinh viên đủ điều kiện</h1>

      {/* Bộ lọc */}
      <div className="p-4 border rounded-md bg-gray-50 space-y-4">
        <h2 className="text-lg font-semibold text-[#88b77b]">Tiêu chí lọc</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="minGpa">Điểm trung bình tích lũy tối thiểu</Label>
            <Input
              id="minGpa"
              name="minGpa"
              value={filters.minGpa}
              onChange={handleFilterChange}
              placeholder="Nhập điểm trung bình"
              type="number"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="minCredits">Số tín chỉ hoàn thành</Label>
            <Input
              id="minCredits"
              name="minCredits"
              value={filters.minCredits}
              onChange={handleFilterChange}
              placeholder="Nhập số tín chỉ"
              type="number"
            />
          </div>
          <div>
            <Label htmlFor="status">Tình trạng đăng ký thực tập</Label>
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả">Tất cả</SelectItem>
                <SelectItem value="Đã đăng ký">Đã đăng ký</SelectItem>
                <SelectItem value="Chưa đăng ký">Chưa đăng ký</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={applyFilters}
          className="mt-4 bg-black text-white hover:bg-gray-800"
        >
          Áp dụng bộ lọc
        </Button>
      </div>

      {/* Danh sách sinh viên */}
      <div className="p-4 border rounded-md bg-white">
        <h2 className="text-lg font-semibold text-[#88b77b] mb-4">Danh sách sinh viên đủ điều kiện</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã số SV</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Điểm TB</TableCell>
              <TableCell>Tín chỉ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.gpa}</TableCell>
                <TableCell>{student.credits}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${
                      student.status === "Đã đăng ký"
                        ? "bg-green-100 text-[#88b77b]"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>
                <Button
  variant="ghost"
  size="icon"
  onClick={() => {
    const url = `/statistical/detail`;
    console.log("Navigating to:", url); // Debug
    router.push(url);
  }}
>
  👁️
</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Hiển thị {filteredStudents.length} trong {students.length} kết quả
          </div>
          <div className="flex space-x-2" >
            <Button onClick={() => exportData("excel")} variant="outline" className="bg-[#0e5243] text-white hover:bg-[#0c4639]">
              Xuất Excel
            </Button>
            <Button onClick={() => exportData("pdf")} variant="outline" className="bg-[#0e5243] text-white hover:bg-[#0c4639]">
              Xuất PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}