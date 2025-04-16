'use client';

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Topic {
  id: string;
  title: string;
  applicants: number;
}

const topics: Topic[] = [
  { id: "TOP001", title: "Hệ thống quản lý nhân sự", applicants: 3 },
  { id: "TOP002", title: "Ứng dụng đặt lịch hẹn", applicants: 5 },
  { id: "TOP003", title: "Ứng dụng đặt phòng", applicants: 6 },
  { id: "TOP004", title: "Ứng dụng sàn điện tử", applicants: 4 },
  { id: "TOP005", title: "Ứng dụng đặt đồ ăn nhanh", applicants: 2 },
];

export default function TopicApplicants() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <div className="p-6 space-y-6">
      <Card className="max-w-4xl mx-auto shadow-lg rounded-lg">
        <CardContent className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-[#88b77b]">Danh Sách Đề Tài Ứng Tuyển</h1>
          {topics.length === 0 ? (
            <p className="text-center text-gray-500">Bạn chưa đăng đề tài nào</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-200">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-2 border border-gray-200">Mã Đề Tài</th>
                  <th scope="col" className="px-4 py-2 border border-gray-200">Tên Đề Tài</th>
                  <th scope="col" className="px-4 py-2 border border-gray-200">Số Lượng Ứng Tuyển</th>
                  <th scope="col" className="px-4 py-2 border border-gray-200">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">{topic.id}</td>
                    <td className="px-4 py-2 border border-gray-200">{topic.title}</td>
                    <td className="px-4 py-2 border border-gray-200">{topic.applicants}</td>
                    <td className="px-4 py-2 border border-gray-200">
                      <Button
                        variant="default"
                        onClick={() => setSelectedTopic(topic)}
                         className="bg-[#0e5243] text-white hover:bg-[#0c4639]"
                      >
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Modal hiển thị chi tiết đề tài */}
      {selectedTopic && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-center border-b pb-2">Chi Tiết Đề Tài</h2>
            <p className="mb-2">
              <strong>Tên Đề Tài:</strong> {selectedTopic.title}
            </p>
            <p className="mb-2">
              <strong>Số Lượng Ứng Tuyển:</strong> {selectedTopic.applicants}
            </p>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedTopic(null)}
                 className="bg-[#0e5243] text-white hover:bg-[#0c4639]"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}