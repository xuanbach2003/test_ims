import React, { useState } from "react";

const students = [
  { id: "SV001", name: "Nguyễn Văn A", status: "Chưa xếp lịch" },
  { id: "SV002", name: "Trần Thị B", status: "Đã xếp lịch" },
  { id: "SV003", name: "Lê Văn C", status: "Chưa xếp lịch" },
];

const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleScheduleClick = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Lịch vấn đáp đã được xếp thành công!");
    handleCloseModal();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-[#88b77b]">Danh Sách Sinh Viên</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2 border border-gray-200">MSSV</th>
              <th scope="col" className="px-4 py-2 border border-gray-200">Họ và Tên</th>
              <th scope="col" className="px-4 py-2 border border-gray-200">Trạng Thái</th>
              <th scope="col" className="px-4 py-2 border border-gray-200">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="px-4 py-2 border border-gray-200 text-[#88b77b]">{student.id}</td>
                <td className="px-4 py-2 border border-gray-200 text-[#88b77b]">{student.name}</td>
                <td className="px-4 py-2 border border-gray-200 text-[#88b77b]">
                  <span
                    className={`px-2 py-1 rounded-md text-white ${
                      student.status === "Đã xếp lịch"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <button
                    className="px-4 py-2 bg-[#0e5243] text-white rounded-md hover:bg-[#0c4639]"
                    onClick={() => handleScheduleClick(student)}
                  >
                    Xếp lịch
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg w-96 border border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-center border-b pb-2">Xếp Lịch Vấn Đáp</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Ngày
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Thời gian bắt đầu
                </label>
                <input
                  type="time"
                  id="startTime"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  Thời gian kết thúc
                </label>
                <input
                  type="time"
                  id="endTime"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="room" className="block text-sm font-medium text-gray-700">
                  Phòng
                </label>
                <input
                  type="text"
                  id="room"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nhập phòng (VD: A1.01)"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;