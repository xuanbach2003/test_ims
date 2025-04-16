'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Minus } from "lucide-react";

const removeDiacritics = (str: string) =>
  str.normalize("NFD")
  .replace(/\p{Diacritic}/gu, "")
  .replace(/[Đđ]/g, (match) => (match === "Đ" ? "D" : "d"))
  .toLowerCase();

const topics = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Đề tài ${i + 1} - Tên đề tài ví dụ`,
  students: Array.from({ length: 20 }, (_, j) => ({
    name: `Sinh viên ${String.fromCharCode(65 + (j % 26))}${i + 1}${j + 1}`,
    class: "21CLC04",
  })),
}));

const criteria = [
  { id: 1, text: "Tiêu chí 1: Mô tả tiêu chí" },
  { id: 2, text: "Tiêu chí 2: Mô tả tiêu chí" },
  { id: 3, text: "Tiêu chí 3: Mô tả tiêu chí" },
];

export default function Grading() {
  const [step, setStep] = useState<"topic" | "student" | "grading">("topic");
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [evaluationType, setEvaluationType] = useState("");
  const [scores, setScores] = useState<{ [key: number]: string }>({});
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [topicPage, setTopicPage] = useState(1);
  const [studentPage, setStudentPage] = useState(1);

  const itemsPerPage = 10;

  const handleScoreChange = (id: number, value: string) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
  }

  const handleConfirm = () => {
    const confirmSubmit = confirm("Bạn có chắc chắn muốn chấm điểm cho sinh viên này?");
    if (confirmSubmit) {
      toast.success(`Chấm điểm thành công cho sinh viên ${selectedStudent.name}!`);
      setSubmitted(true);
      setStep("student");
    }
  };

  const goBack = () => {
    if (step === "grading") {
      setStep("student");
    } else if (step === "student") {
      setStep("topic");
      setSelectedTopic(null);
    }
  };

  const filteredTopics = topics.filter((topic) => 
    removeDiacritics(topic.title).includes(removeDiacritics(searchTerm)));

  const totalTopicPages = Math.ceil(filteredTopics.length / itemsPerPage);
  const paginatedTopics = filteredTopics.slice(
    (topicPage - 1) * itemsPerPage,
    topicPage * itemsPerPage
  );

  const filteredStudents = selectedTopic
    ? selectedTopic.students.filter((s: any) =>
        removeDiacritics(s.name).includes(removeDiacritics(studentSearchTerm))
      )
    : [];

  const totalStudentPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (studentPage - 1) * itemsPerPage,
    studentPage * itemsPerPage
  );

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
  ) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "bg-[#88b77b] text-white" : ""}
        >
          {i}
        </Button>
      );
    }
    return <div className="flex gap-2 mt-4 justify-center">{pages}</div>;
  };

  return (
    <div className="p-6 space-y-4">
      {step === "topic" && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center content-color">Danh sách đề tài</h2>
            <Input
              placeholder="Tìm kiếm đề tài..."
              className="mb-4"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setTopicPage(1);
              }}
            />
            <div className="space-y-2">
              {paginatedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setStep("student");
                  }}
                >
                  <div className="font-medium">{topic.title}</div>
                </div>
              ))}
            </div>
            {renderPagination(topicPage, totalTopicPages, setTopicPage)}
          </CardContent>
        </Card>
      )}

      {step === "student" && selectedTopic && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-center content-color">
              Danh sách sinh viên - {selectedTopic.title}
            </h2>
            <Input
              placeholder="Tìm kiếm sinh viên..."
              className="mb-2"
              value={studentSearchTerm}
              onChange={(e) => {
                setStudentSearchTerm(e.target.value);
                setStudentPage(1);
              }}
            />
            <div className="space-y-2">
              {paginatedStudents.map((student: any, index: number) => (
                <div
                  key={index}
                  className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedStudent(student);
                    setSubmitted(false);
                    setEvaluationType("");
                    setScores({});
                    setStep("grading");
                  }}
                >
                  {student.name} - {student.class}
                </div>
              ))}
            </div>
            {renderPagination(studentPage, totalStudentPages, setStudentPage)}
            <div className="pt-4">
              <Button variant="outline" onClick={goBack} className="button-color">
                Quay lại                
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "grading" && selectedStudent && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-center content-color">Chấm điểm sinh viên</h2>
            <div className="flex justify-between items-center">
              <div>
                <div>Họ tên sinh viên: {selectedStudent.name}</div>
                <div>Lớp: {selectedStudent.class}</div>
                <div>Đề tài: {selectedTopic.title}</div>
              </div>
            </div>

            <Select onValueChange={setEvaluationType} value={evaluationType}>
              <SelectTrigger className="w-[200px] ml-auto">
                <SelectValue placeholder="Loại đánh giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="report">Chấm báo cáo</SelectItem>
                <SelectItem value="defense">Chấm vấn đáp</SelectItem>
                <SelectItem value="company">Doanh nghiệp</SelectItem>
              </SelectContent>
            </Select>
            {!evaluationType && (
              <div className="text-red-500 text-center">*Vui lòng chọn loại đánh giá để tiến hành chấm điểm</div>
            )}

            {evaluationType && (
              <div className="space-y-3">
                {criteria.map((c) => (
                  <div key={c.id}>
                    <label className="block mb-1 font-medium">{c.text}</label>
                    <Input
                      type="text"
                      placeholder={`Nhập điểm cho tiêu chí ${c.id}`}
                      onChange={(e) => handleScoreChange(c.id, e.target.value)}
                      value={scores[c.id] || ""}
                    />
                  </div>
                ))}
              </div>
            )}

            {evaluationType && (
              <div>
                <label className="block mb-1 font-medium">Nhận xét sinh viên</label>
                <Input
                  type="text"
                  placeholder="Nhập nhận xét"
                  onChange={(e) => handleCommentChange(e.target.value)}
                  value={comment || ""}
                />
              </div>
            )}

            {evaluationType && (
              <div className="flex gap-4 mt-4 justify-center">
                <Button variant="destructive" onClick={() => setStep("student")} className="hover:bg-red-500 w-24">
                  Hủy
                </Button>
                <Button
                  className="button-color"
                  onClick={handleConfirm}
                >
                  Xác nhận
                </Button>
              </div>
            )}
            
            <div className="pt-4">
              <Button variant="outline" onClick={goBack} className="button-color">
                Quay lại
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
