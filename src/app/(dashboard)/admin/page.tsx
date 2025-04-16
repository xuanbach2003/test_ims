'use client'

import { useState, useEffect } from "react";
// Removed AdminCalendar import as it does not exist
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import AdminCalendar from "@/components/AdminCalendar";
import ChartAdmin from "@/components/ChartAdmin"; // 

const AdminPage = () => {
  // State để lưu số lượng tài khoản
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    companies: 0,
  });

  // Giả sử bạn có API để lấy số lượng tài khoản
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats"); // Thay bằng endpoint API thực tế
        const data = await response.json();
        setStats({
          students: data.students,
          teachers: data.teachers,
          companies: data.companies,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Main Content */}
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* USER CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle>Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats.students} active accounts</p>
              </CardContent>
            </Card>
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle>Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats.teachers} active accounts</p>
              </CardContent>
            </Card>
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle>Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats.companies} active accounts</p>
              </CardContent>
            </Card>
          </div>

          {/* MIDDLE CHARTS */}
          <Tabs defaultValue="count" className="w-full">
            <TabsList>
              <TabsTrigger value="count">Count Chart</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluation Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="count">
              <div className="h-[450px] bg-gray-100 flex items-center justify-center rounded-md">
                <ChartAdmin />
              </div>
            </TabsContent>
            <TabsContent value="evaluation">
              <div className="h-[450px] bg-gray-100 flex items-center justify-center rounded-md">
                <p>Evaluation Chart Placeholder</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
            <AdminCalendar />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;