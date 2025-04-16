'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const handleLogin = async (
  event: React.FormEvent<HTMLFormElement>,
  router: ReturnType<typeof useRouter>
) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const usernameInput = formData.get("username") as string;
  const passwordInput = formData.get("password") as string;

  try {
    const response = await fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usernameInput, password: passwordInput }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("role", data.role);
    console.log(data)
    router.push("/dashboard");
  } catch (error) {
    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
  }
};

export default function Login() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      router.push("/dashboard");
    } 
    else setIsChecking(false)
  }, [router]);

  if (isChecking) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Đăng Nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(event) => handleLogin(event, router)}>
            <div className="space-y-4">
              <div className="flex items-center border rounded-md px-3 py-2">
                <span className="material-icons text-gray-500 mr-2">person</span>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="border-none focus:ring-0 w-full"
                />
              </div>
              <div className="flex items-center border rounded-md px-3 py-2">
                <span className="material-icons text-gray-500 mr-2">lock</span>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border-none focus:ring-0 w-full"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0e5243] hover:bg-[#0e5243] text-white font-semibold py-2 mt-4"
            >
              Đăng Nhập
            </Button>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link href="/reset-password" className="text-sm text-[#88b77b]">
                Quên mật khẩu?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
