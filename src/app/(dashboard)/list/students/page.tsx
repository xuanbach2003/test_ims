'use client'
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  subjects: string;
  class: string;
  address: string;
  status: "active" | "inactive";
};

const columns = [
  {
    header: "Họ và tên",
    accessor: "info",
  },
  {
    header: "MSSV",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "GPA",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Khoa",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Bộ môn",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Số điện thoại",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Thao tác",
    accessor: "action",
  },
  {
    header: "Trạng thái",
    accessor: "status",
    className: "hidden md:table-cell",
  },
];
const StudentListPage = () => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const handleSort = (type: string) => {
    console.log(`Sorting by: ${type}`);
    setSortDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  const handleFilter = (type: string) => {
    console.log(`Filtering by: ${type}`);
    setFilterDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.subjects}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              item.status === "active"
                ? "bg-green-500 animate-pulse"
                : "bg-red-500"
            }`}
          ></span>
          <span className="text-sm">
            {item.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
          </span>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Danh sách tài khoản sinh viên
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end relative">
            {/* Filter Button */}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-300"
              onClick={() => setFilterDropdownOpen((prev) => !prev)}
            >
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            {filterDropdownOpen && (
              <div className="absolute top-10 left-0 bg-white border rounded shadow z-10 w-40">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilter("subjects")}
                  >
                    Bộ môn
                  </li>
                </ul>
              </div>
            )}

            {/* Sort Button */}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-300"
              onClick={() => setSortDropdownOpen((prev) => !prev)}
            >
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {sortDropdownOpen && (
              <div className="absolute top-12 left-0 bg-white border rounded shadow z-10 w-40">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("name-asc")}
                  >
                    Tên A-Z
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("name-desc")}
                  >
                    Tên Z-A
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Trạng thái
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("studentId")}
                  >
                    MSSV
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("gpa")}
                  >
                    GPA
                  </li>
                </ul>
              </div>
            )}
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
