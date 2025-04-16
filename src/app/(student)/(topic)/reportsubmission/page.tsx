'use client';

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, X, Eye, Download } from "lucide-react";
import { Table, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface FileStatus {
  reportSubmitted: boolean;
  graded: boolean;
  deadlinePassed: boolean;
}

const UploadInternReport: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<FileStatus>({
    reportSubmitted: false,
    graded: false,
    deadlinePassed: false,
  });
  const [submitTime, setSubmitTime] = useState<Date | null>(null);
  const deadline: Date = new Date("2025-04-20");
  const now: Date = new Date();

  const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const formatDateTime = (date: Date): string => {
    return `${formatDate(date)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 20 * 1024 * 1024; // 20MB

    const validFiles = Array.from(files).filter((file) => {
      if (!validTypes.includes(file.type)) {
        toast.error(`Định dạng không hợp lệ cho file: ${file.name}`);
        return false;
      }
      if (file.size === 0 || file.size > maxSize) {
        toast.error(`Dung lượng không hợp lệ cho file: ${file.name}`);
        return false;
      }
      if(uploadedFiles.some((f) => f.name === file.name)) {
        toast.error(`File đã tồn tại: ${file.name}`); 
        return false;
      }
      return true;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleSubmit = (): void => {
    if (status.deadlinePassed || now > deadline) {
      toast.error("Hạn nộp đã kết thúc, không thể nộp báo cáo");
      return;
    }

    if (status.graded) {
      toast.error("Báo cáo đã được chấm điểm, không thể thay đổi");
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error("Vui lòng tải lên ít nhất một file báo cáo");
      return;
    }

    const confirm = window.confirm("Bạn có chắc chắn muốn nộp báo cáo? Sau khi nộp sẽ không thể chỉnh sửa nếu đã được chấm điểm.");
    if (!confirm) return;

    setStatus({ ...status, reportSubmitted: true });
    setSubmitTime(new Date());
    toast.success("Nộp báo cáo thành công!", {
      description: `Bạn đã nộp báo cáo thành công cho đề tài. Xin vui lòng đợi được chấm điểm`,
      duration: 10000
    });
  };

  const removeFile = (index: number) => {
    const NewUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(NewUploadedFiles);
  };

  const viewFile = (file: File): void => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    else if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    else return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  };

  const isDisabled = status.graded || now > deadline || status.reportSubmitted;

  return (
    <Card className="max-w-xl mx-auto mt-10 p-6 shadow-xl rounded-2xl">
      <CardContent className="space-y-4">
        <div className="text-xl font-bold">Nộp báo cáo thực tập</div>
        <div className="text-sm text-gray-600">
          Hạn nộp: {formatDate(deadline)} ({
            Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          )} ngày còn lại)
        </div>
        <div className="rounded-lg">
          Thời gian nộp: 
          <span className={status.reportSubmitted ? 'content-color' : 'text-yellow-500'}>
            {submitTime ? " " + formatDateTime(submitTime) : " Chưa nộp"}
          </span>
        </div>
        <div className="rounded-lg">
          Trạng thái nộp bài: 
          <span className={status.reportSubmitted ? 'content-color' : 'text-yellow-500'}>
            {status.reportSubmitted ? " Đã nộp" : " Chưa nộp"}
          </span>
        </div>
        <div className="rounded-lg">
          Trạng thái chấm điểm: 
          <span className={status.graded ? 'content-color' : 'text-yellow-500'}>
            {status.graded ? " Đã chấm" : " Chưa chấm"}
          </span>
        </div>
        <div className="border p-4 rounded-md bg-gray-100">
          {uploadedFiles.length === 0 ? (
            <div className="text-gray-500">Chưa có báo cáo</div>
          ) : (
            <Table className="min-w-full table-auto border-collapse">
              <TableBody>
                {uploadedFiles.map((file, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="px-4 py-2">
                      <div className="flex items-center">
                        <img
                          src={file.type === "application/pdf" ? "/pdf.png" : "/doc.png"}
                          className="h-5 w-5 mr-2"
                          alt="file icon"
                        />
                        <span className="truncate max-w-xs content-color" title={file.name}>
                          {file.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-2 text-xs text-gray-500">{formatFileSize(file.size)}</TableCell>
                    <TableCell className="px-4 py-2">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewFile(file)}
                          title="Xem File"
                        >
                          <Eye className="w-4 h-4 cursor-pointer hover:content-color" style={{ pointerEvents: 'auto' }}/>
                        </Button>
                        {!status.reportSubmitted && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            title="Xóa File"
                          >
                            <X className="w-4 h-4 cursor-pointer hover:text-red-500" style={{ pointerEvents: 'auto' }}/>
                          </Button>
                        )}
                        <a
                          href={URL.createObjectURL(file)}
                          download={file.name}
                          title="Tải File"
                        >
                          <Download className="w-6 h-4 cursor-pointer hover:content-color" style={{ pointerEvents: 'auto' }}/>
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!status.reportSubmitted && (
            <label className="flex items-center gap-2 mt-2 cursor-pointer text-blue-600 hover:underline">
              <UploadCloud className="w-4 h-4" />
              <span>Thêm báo cáo</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                multiple
              />
            </label>
          )}
          <div className="mt-2 content-color text-sm">* Định dạng cho phép: PDF, Docx</div>
        </div>

        <Button
          className={`w-full mt-4 ${isDisabled ? 'bg-red-700 cursor-not-allowed opacity-50' : 'button-color hover:opacity-75'}`}
          onClick={handleSubmit}
          disabled={isDisabled}
          style={{ pointerEvents: 'auto' }}
        >
          Nộp báo cáo
        </Button>
      </CardContent>
    </Card>
  );
};

export default UploadInternReport;
