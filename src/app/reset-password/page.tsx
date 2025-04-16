'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const handleResetPassword = async (email: string) => {
  try {
    const response = await fetch("http://localhost:8080/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send reset link. Please try again.");
    }

    alert("A reset link has been sent to your email.");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unexpected error occurred.");
    }
  }
};

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleResetPassword(email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Đặt lại mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center border rounded-md px-3 py-2">
                <span className="material-icons text-gray-500 mr-2">email</span>
                <Input
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none focus:ring-0 w-full"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 bg-[#0c4639] text-white font-semibold py-2 mt-4"
            >
              Gửi liên kết đặt lại mật khẩu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}