import React from "react";

const notifications = [
  {
    id: 1,
    title: "Thông báo mới",
    message: "Có 3 sinh viên chưa được xếp lịch vấn đáp.",
  },
  {
    id: 2,
    title: "TS. Phạm Văn X",
    message: "Lịch vấn đáp: 22/02/2024 (09:00 - 10:00).",
  },
  {
    id: 3,
    title: "TS. Lê Thị Y",
    message: "Lịch vấn đáp: 22/02/2024 (10:00 - 11:00).",
  },
];

const Notifications = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-[#88b77b]">Thông Báo</h2>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="p-4 border rounded-md shadow-sm bg-gray-50"
          >
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <button className="mt-2 px-4 py-2 bg-[#0e5243] text-white rounded-md hover:bg-[#0c4639]">
              Gửi thông báo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;