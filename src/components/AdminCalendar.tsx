'use client';

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import CSS mặc định của react-calendar

const AdminCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Select a Date</h2>
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        className="react-calendar"
      />
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-gray-600">
          Selected Date:{" "}
          <span className="text-blue-500">
            {selectedDate ? selectedDate.toDateString() : "No date selected"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminCalendar;