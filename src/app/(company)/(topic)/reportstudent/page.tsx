'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Topic {
  id: string;
  title: string;
  quantity: number;
  deadline: string;
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  status: string;
}

const topics: Topic[] = [
  { id: "INT01", title: "Lập trình web", quantity: 4, deadline: "15/03/2025" },
  { id: "INT02", title: "Lập trình mobile", quantity: 5, deadline: "20/03/2025" },
];

const students: Student[] = [
  { id: "STU001", name: "John Smith", studentId: "STU001", status: "Pending" },
  { id: "STU002", name: "Jane Doe", studentId: "STU002", status: "Pending" },
];

export default function EvaluateStudents() {
  const [step, setStep] = useState<"topic" | "student" | "evaluation">("topic");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [evaluationData, setEvaluationData] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
    skill4: "",
    result: "",
  });

  const handleEvaluationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvaluationData({ ...evaluationData, [name]: value });
  };

  const handleSubmitEvaluation = () => {
    if (
      !evaluationData.skill1 ||
      !evaluationData.skill2 ||
      !evaluationData.skill3 ||
      !evaluationData.skill4 ||
      !evaluationData.result
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin đánh giá!");
      return;
    }

    toast.success("Đánh giá thành công!");
    setEvaluationData({
      skill1: "",
      skill2: "",
      skill3: "",
      skill4: "",
      result: "",
    });
    setStep("student"); // Quay lại danh sách sinh viên
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-6 shadow-xl rounded-2xl">
      <CardContent className="space-y-6">
        {step === "topic" && (
          <>
            <h1 className="text-2xl font-bold text-[#88b77b]">Lựa chọn đề tài</h1>
            <div className="space-y-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 border rounded-md hover:bg-gray-100 cursor-pointer text-[#88b77b]"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setStep("student");
                  }}
                >
                  <div className="font-semibold">{topic.title}</div>
                  <div className="text-sm text-gray-600">
                    Số lượng: {topic.quantity} - Hạn chót: {topic.deadline}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "student" && selectedTopic && (
          <>
            <h1 className="text-2xl font-bold text-[#88b77b]">Lựa chọn sinh viên</h1>
            <div className="text-sm text-gray-600 mb-4">
  <strong>Đề tài:</strong> {selectedTopic.title} - <strong>Hạn chót:</strong> {selectedTopic.deadline}
</div>
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 border rounded-md hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    setSelectedStudent(student);
                    setStep("evaluation");
                  }}
                >
                  <div>
                    <div className="font-semibold">{student.name}</div>
                    <div className="text-sm text-gray-600">Mã sinh viên: {student.studentId}</div>
                  </div>
                  <Button variant="default" className="bg-[#0e5243] text-white hover:bg-[#0c4639]">Đánh giá</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => setStep("topic")} className="mt-4">
              Quay lại
            </Button>
          </>
        )}

        {step === "evaluation" && selectedStudent && (
          <>
            <h1 className="text-2xl font-bold text-[#88b77b]">Đánh giá sinh viên</h1>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Sinh viên:</strong> {selectedStudent.name} - <strong>Mã sinh viên:</strong> {selectedStudent.studentId}
            </div>
            <div className="space-y-4 text-[#88b77b]">
              <div>
                <Label htmlFor="skill1">Kiến thức kỹ thuật chuyên môn</Label>
                <Input
                  id="skill1"
                  name="skill1"
                  value={evaluationData.skill1}
                  onChange={handleEvaluationChange}
                  placeholder="Nhập đánh giá"
                  required
                />
              </div>
              <div>
                <Label htmlFor="skill2">Khả năng làm việc nhóm</Label>
                <Input
                  id="skill2"
                  name="skill2"
                  value={evaluationData.skill2}
                  onChange={handleEvaluationChange}
                  placeholder="Nhập đánh giá"
                  required
                />
              </div>
              <div>
                <Label htmlFor="skill3">Khả năng trao đổi thông tin</Label>
                <Input
                  id="skill3"
                  name="skill3"
                  value={evaluationData.skill3}
                  onChange={handleEvaluationChange}
                  placeholder="Nhập đánh giá"
                  required
                />
              </div>
              <div>
                <Label htmlFor="skill4">Thái độ và trách nhiệm</Label>
                <Input
                  id="skill4"
                  name="skill4"
                  value={evaluationData.skill4}
                  onChange={handleEvaluationChange}
                  placeholder="Nhập đánh giá"
                  required
                />
              </div>
              <div>
                <Label htmlFor="result">Kết quả thực tập</Label>
                <Textarea
                  id="result"
                  name="result"
                  value={evaluationData.result}
                  onChange={handleEvaluationChange}
                  placeholder="Nhập kết quả thực tập"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="outline" onClick={() => setStep("student")}>
                Hủy
              </Button>
              <Button variant="default" onClick={handleSubmitEvaluation} className="bg-[#0e5243] text-white hover:bg-[#0c4639]">
                Xác nhận
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}