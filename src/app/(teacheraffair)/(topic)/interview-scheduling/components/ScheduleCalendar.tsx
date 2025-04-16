import React, { useState } from "react";

const mockSchedule = [
  {
    date: "2025-02-22",
    slots: [
      {
        time: "09:00 - 10:00",
        student: "Nguyễn Văn A",
        teacher: "TS. Phạm Văn X",
        room: "A1.01",
      },
      {
        time: "10:00 - 11:00",
        student: "Trần Thị B",
        teacher: "TS. Lê Thị Y",
        room: "A1.02",
      },
    ],
  },
];

const ScheduleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>("2025-02-22");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const scheduleForDate = mockSchedule.find(
    (schedule) => schedule.date === selectedDate
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-[#88b77b]">Lịch Vấn Đáp</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-[#88b77b]">
          Chọn ngày
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 block w-40 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        {scheduleForDate ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-2">
                  Thời gian
                </th>
                <th scope="col" className="px-4 py-2">
                  Sinh viên
                </th>
                <th scope="col" className="px-4 py-2">
                  Giảng viên
                </th>
                <th scope="col" className="px-4 py-2">
                  Phòng
                </th>
              </tr>
            </thead>
            <tbody>
              {scheduleForDate.slots.map((slot, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{slot.time}</td>
                  <td className="px-4 py-2">{slot.student}</td>
                  <td className="px-4 py-2">{slot.teacher}</td>
                  <td className="px-4 py-2">{slot.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Không có lịch vấn đáp cho ngày này.</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleCalendar;