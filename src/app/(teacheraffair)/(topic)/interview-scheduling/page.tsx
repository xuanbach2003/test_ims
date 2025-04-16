"use client";

import React, { useState } from "react";
import StudentList from "./components/StudentList";
import ScheduleCalendar from "./components/ScheduleCalendar";
import Notifications from "./components/Notifications";

const InterviewSchedulingPage = () => {
  const [activeTab, setActiveTab] = useState<"students" | "schedule" | "notifications">("students");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-6">Lập Lịch Vấn Đáp</h1> */}
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-[#88b77b] ${activeTab === "students" ? "border-b-2 border-black-500 font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("students")}
        >
          Danh Sách Sinh Viên
        </button>
        <button
          className={`px-4 py-2 text-[#88b77b] ${activeTab === "schedule" ? "border-b-2 border-black-500 font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("schedule")}
        >
          Lịch Vấn Đáp
        </button>
        <button
          className={`px-4 py-2 text-[#88b77b] ${activeTab === "notifications" ? "border-b-2 border-black-500 font-semibold" : "text-gray-500"}`}
          onClick={() => setActiveTab("notifications")}
        >
          Thông Báo
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "students" && (
          <div>
            <StudentList />
          </div>
        )}
        {activeTab === "schedule" && (
          <div>
            <ScheduleCalendar />
          </div>
        )}
        {activeTab === "notifications" && (
          <div>
            <Notifications />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSchedulingPage;