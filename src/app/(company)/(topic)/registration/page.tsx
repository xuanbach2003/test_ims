'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function PostJobListing() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    requirements: "",
    gpa: "",
    major: "",
    quantity: "",
    deadline: "",
    duration: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title || !formData.location || !formData.description || !formData.requirements || !formData.gpa || !formData.major || !formData.quantity || !formData.deadline || !formData.duration) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Simulate API call
    toast.success("Đăng tin tuyển dụng thành công!", {
      description: `Đề tài "${formData.title}" đã được đăng thành công.`,
    });

    // Reset form
    setFormData({
      title: "",
      location: "",
      description: "",
      requirements: "",
      gpa: "",
      major: "",
      quantity: "",
      deadline: "",
      duration: "",
    });

    // Chuyển hướng đến trang danh sách đề tài ứng tuyển
    router.push("/company/topic/applicants");
  };

  return (
    <div className="p-6 space-y-6 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-bold text-[#88b77b]">Đăng thông tin đề tài thực tập</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Tên đề tài *</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Nhập tên đề tài" required />
        </div>
        <div>
          <Label htmlFor="location">Địa điểm *</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Nhập địa điểm" required />
        </div>
        <div>
          <Label htmlFor="description">Mô tả công việc *</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Nhập mô tả công việc" required />
        </div>
        <div>
  <Label htmlFor="requirements">Yêu cầu khác *</Label>
  <Textarea
    id="requirements"
    name="requirements"
    value={formData.requirements}
    onChange={handleChange}
    placeholder="Nhập các yêu cầu khác (nếu có)"
    required
  />
</div>

<div>
  <Label htmlFor="englishCertificate">Chứng chỉ tiếng Anh</Label>
  <Input
    id="englishCertificate"
    name="englishCertificate"
    placeholder="Ví dụ: IELTS 6.5, TOEIC 750..."
    onChange={handleChange}
    value={(formData as any).englishCertificate || ""}
  />
</div>

<div>
  <Label htmlFor="specializedCertificateName">Chứng chỉ chuyên ngành</Label>
  <Input
    id="specializedCertificateName"
    name="specializedCertificateName"
    placeholder="Nhập tên chứng chỉ chuyên ngành (nếu có)"
    onChange={handleChange}
    value={(formData as any).specializedCertificateName || ""}
  />
</div>

<div>
  <Label htmlFor="specializedCertificateFile">Tải lên hình ảnh chứng chỉ chuyên ngành</Label>
  <Input
    type="file"
    id="specializedCertificateFile"
    name="specializedCertificateFile"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          specializedCertificateFile: file,
          specializedCertificatePreview: imageUrl,
        }));
      }
    }}
  />
  {(formData as any).specializedCertificatePreview && (
    <div className="mt-2">
      <img
        src={(formData as any).specializedCertificatePreview}
        alt="Preview"
        className="w-40 h-auto rounded border"
      />
    </div>
  )}
</div>


        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gpa">GPA tối thiểu *</Label>
            <Input id="gpa" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="Nhập GPA tối thiểu" required />
          </div>
          <div>
            <Label htmlFor="major">Chuyên ngành ưu tiên *</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, major: value })}
            >
              <SelectTrigger id="major" name="major" className="w-full">
                <SelectValue placeholder="Chọn chuyên ngành" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SoftwareEngineering">Kỹ thuật phần mềm</SelectItem>
                <SelectItem value="InformationSystems">Hệ thống thông tin</SelectItem>
                <SelectItem value="ComputerScience">Khoa học máy tính</SelectItem>
                <SelectItem value="CyberSecurity">An toàn thông tin</SelectItem>
                <SelectItem value="DataScience">Khoa học dữ liệu</SelectItem>
                <SelectItem value="ArtificialIntelligence">Trí tuệ nhân tạo</SelectItem>
                <SelectItem value="Networking">Mạng máy tính</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">Số lượng *</Label>
            <Input id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Nhập số lượng" required />
          </div>
          <div>
            <Label htmlFor="deadline">Hạn chót nộp hồ sơ *</Label>
            <Input id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} type="date" required />
          </div>
        </div>
        <div>
          <Label htmlFor="duration">Thời gian thực tập *</Label>
          <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="Nhập thời gian thực tập (tháng)" required />
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="secondary" className="bg-red-500 hover:bg-red-500" onClick={() => setFormData({
            title: "",
            location: "",
            description: "",
            requirements: "",
            gpa: "",
            major: "",
            quantity: "",
            deadline: "",
            duration: "",
          })}>
            Hủy
          </Button>
          <Button type="submit" variant="default"  className="bg-[#0e5243] text-white hover:bg-[#0c4639]">
            Đăng tuyển
          </Button>
        </div>
      </form>
    </div>
  );
}