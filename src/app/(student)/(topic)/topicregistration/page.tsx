'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, UploadCloud, X, Eye, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

interface Topic {
  id: number;
  name: string;
  description: string;
  duration: string;
  quantityLeft: number;
  totalQuantity?: number;
  endRegisterDate: string;
  startDate: string;
  endDate: string;
  company: string;
  registered: boolean;
  status: string;
  cv?: CvDetails[];
}

interface CvDetails {
  name: string;
  size: number;
  type: string;
  url: string;
}

const topics: Topic[] = [
  { id: 1, name: "Intern Frontend ReactJS", description: "Tham gia phát triển giao diện web sử dụng ReactJS, NextJS và TailwindCSS.", duration: "3 tháng", quantityLeft: 50, totalQuantity: 100, endRegisterDate:"12/12/2025", startDate: "01/05/2024", endDate: "01/08/2024", company: "Công ty Công nghệ A", registered: false, status: "Chưa duyệt" },
  { id: 2, name: "Intern Backend NodeJS", description: "Phát triển API sử dụng NodeJS, Express, và tích hợp cơ sở dữ liệu MongoDB.", duration: "6 tháng",quantityLeft: 50, totalQuantity: 100, endRegisterDate:"12/12/2025", startDate: "01/06/2024", endDate: "01/12/2024", company: "Công ty Phần mềm B", registered: false, status: "Chưa duyệt" },
  { id: 3, name: "Intern Mobile Flutter", description: "Xây dựng ứng dụng di động đa nền tảng với Flutter, tích hợp Firebase.", duration: "4 tháng", quantityLeft: 50, totalQuantity: 100, endRegisterDate:"12/12/2025", startDate: "15/05/2024", endDate: "15/09/2024", company: "Công ty Startup C", registered: false, status: "Chưa duyệt" },
  { id: 4, name: "Intern AI & Machine Learning", description: "Tham gia nghiên cứu và phát triển mô hình Machine Learning với Python và TensorFlow.",quantityLeft: 50, totalQuantity: 100, endRegisterDate:"12/12/2025", duration: "5 tháng", startDate: "01/07/2024", endDate: "01/12/2024", company: "Công ty AI X", registered: false, status: "Chưa duyệt" },
  { id: 5, name: "Intern DevOps Engineer", description: "Triển khai hệ thống CI/CD, quản lý server trên AWS/GCP, sử dụng Docker và Kubernetes.", duration: "6 tháng", quantityLeft: 50, totalQuantity: 100, endRegisterDate:"12/12/2025", startDate: "10/06/2024", endDate: "10/12/2024", company: "Công ty Cloud Y", registered: false, status: "Chưa duyệt" },
];

export default function TopicRegistration() {
  const [search, setSearch] = useState<string>("");
  const [registeredTopics, setRegisteredTopics] = useState<Topic[]>([]);
  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);
  const [cvFiles, setCvFiles] = useState<CvDetails[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showTopicDialog, setShowTopicDialog] = useState<boolean>(false);
  const [pendingTopic, setPendingTopic] = useState<Topic | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRegister = (topic: Topic) => {
    setCvFiles([]);
    setPendingTopic(topic);
    setShowUploadDialog(true);

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(!files) return

    const uploaded: CvDetails[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== 'application/pdf') {
        toast.error(`File "${file.name}" không phải định dạng PDF.`);
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        toast.error(`File "${file.name}" quá lớn. Vui lòng chọn file nhỏ hơn 20MB.`);
        return;
      }
      if (cvFiles.some(existingFile => existingFile.name === file.name)) {
        toast.error(`File "${file.name}" đã được tải lên trước đó.`);
        continue;
      }

      uploaded.push({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      });
    }

    if (uploaded.length > 0) {
      setCvFiles(prev => [...prev, ...uploaded]);
    }
  };

  const handleDeleteFile = (index: number) => {
    const newFiles = cvFiles.filter((_, i) => i !== index);
    setCvFiles(newFiles);
  };

  const viewFile = (file: CvDetails): void => {
      window.open(file.url, "_blank");
    };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    else if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    else return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  };

  const handleEditCV = (topic: Topic) => {
    setPendingTopic(topic);
    setCvFiles(topic.cv || []);
    setShowUpdateDialog(true);
  };

  const handleUnregister = (topicId: number) => {
    const confirmUnregister = confirm("Bạn có chắc chắn muốn hủy đăng ký đề tài này?");
    if (!confirmUnregister) return;
    const unRegisteredTopic = registeredTopics.find((t) => t.id === topicId);
    setRegisteredTopics(registeredTopics.filter((t) => t.id !== topicId));
    toast.success("Hủy đăng ký đề tài thành công!", {
      description: `Bạn đã hủy đăng ký thành công đề tài ${unRegisteredTopic?.name}.`,
      duration: 10000
    });
  };

  const handleTopicRegistration = () => {
    if (!pendingTopic) return;

    if (cvFiles.length === 0) {
      toast.error("Vui lòng tải lên file CV trước.");
      return;
    }
    const confirmSubmit = confirm("Bạn có chắc chắn muốn nộp CV cho đề tài này?");
    if (confirmSubmit) {
      setIsSubmitting(true);

      setTimeout(() => {
        const updatedTopic = {
          ...pendingTopic,
          registered: true,
          cv: cvFiles,
        }
        setRegisteredTopics((prev) => {
          const topicIndex = prev.findIndex((t) => t.id === pendingTopic.id);
  
          if (topicIndex === -1) {
            return [...prev, updatedTopic];
          } else {
            const updatedTopics = [...prev];
            updatedTopics[topicIndex] = updatedTopic;
            return updatedTopics;
          }
        });

        setCvFiles([]);
        setShowUploadDialog(false);
        setPendingTopic(null);
        
        setTimeout(() => {
          setIsSubmitting(false);
  
          toast.success("Đăng ký đề tài thành công!", {
            description: `Bạn đã đăng ký thành công đề tài ${pendingTopic.name}. Xin vui lòng đợi phản hồi từ doanh nghiệp.`,
            duration: 10000
          });
        }, 500);
      }, 1000);
    }
  }

  const handleCVUpdate = () => {
    if (!pendingTopic) return;

    if (cvFiles.length === 0) {
      toast.error("Vui lòng tải lên file CV trước.");
      return;
    }
    const confirmSubmit = confirm("Bạn có chắc chắn muốn cập nhật danh sách CV cho đề tài này?");
    if (confirmSubmit) {
      setIsSubmitting(true);

      setTimeout(() => {
        const updatedTopic = {
          ...pendingTopic,
          registered: true,
          cv: cvFiles,
        }
        setRegisteredTopics((prev) => {
          const topicIndex = prev.findIndex((t) => t.id === pendingTopic.id);
          const updatedTopics = [...prev];
          updatedTopics[topicIndex] = updatedTopic;
          return updatedTopics;
        });

        setCvFiles([]);
        setShowUpdateDialog(false);
        setPendingTopic(null);
        
        setTimeout(() => {
          setIsSubmitting(false);
  
          toast.success("Cập nhật CV thành công!", {
            description: `Bạn đã cập nhật CV thành công cho đề tài ${pendingTopic.name}. Xin vui lòng đợi phản hồi từ doanh nghiệp.`,
            duration: 10000
          });
        }, 500);
      }, 1000);
    }
  }

  const openTopicDialog = (topic: Topic) => {
    setSelectedTopic(topic);
    setShowTopicDialog(true);
  };

  return (
    <div className="p-6 space-y-6 border border-gray-300 rounded-lg">
      <Label htmlFor="search" className="text-xl font-semibold content-color">🔍 Tìm kiếm đề tài</Label>
      <Input id="search" placeholder="Nhập tên đề tài..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-2 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" />
      
      {registeredTopics.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold content-color mb-6">📌 Đề tài đã đăng ký</h2>
          <div className="space-y-4">
            {registeredTopics.map((topic) => (
              <Card key={topic.id} className="shadow-lg border border-gray-200 rounded-lg">
                <CardHeader>
                  <CardTitle onClick={() => openTopicDialog(topic)} className="text-lg font-semibold content-color hover:underline cursor-pointer">
                    {topic.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="content-color"><strong className="text-gray-600">Mô tả:</strong> {topic.name}</p>
                  <p><strong className="text-gray-600">Thời gian:</strong> {topic.duration}</p>
                  <p><strong className="text-gray-600">Số lượng sinh viên đã được duyệt:</strong> {topic.quantityLeft}/{topic.totalQuantity}</p>
                  <p><strong className="text-gray-600">Hạn chót đăng ký:</strong> {topic.endRegisterDate}</p>
                  <p><strong className="text-gray-600">Bắt đầu:</strong> {topic.startDate}</p>
                  <p><strong className="text-gray-600">Kết thúc:</strong> {topic.endDate}</p>
                  <p><strong className="text-gray-600">Doanh nghiệp:</strong> {topic.company}</p>
                  <p className="text-yellow-400 font-medium"><strong>Trạng thái:</strong> {topic.status}</p>
                  <Button variant="destructive" onClick={() => handleUnregister(topic.id)} className="hover:bg-red-500">
                    <Minus size={16} /> Hủy đăng ký
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleEditCV(topic)}
                    className="ml-4 mt-2 content-color border-green-500 bg-yellow-300 hover:bg-yellow-400"
                  >
                    <UploadCloud size={16} /> Chỉnh sửa CV
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold text-yellow-400 pt-10">📃 Danh sách đề tài</h2>
      <div className="space-y-4">
        {topics.filter(t => t.name.toLowerCase().includes(search) && !registeredTopics.some(rt => rt.id === t.id)).map((topic) => (
          <Card key={topic.id} className="shadow-lg border border-gray-200 rounded-lg">
            <CardHeader>
              <CardTitle onClick={() => openTopicDialog(topic)} className="text-lg font-semibold content-color hover:underline cursor-pointer">
                {topic.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="content-color"><strong className="text-gray-600">Mô tả:</strong> {topic.description}</p>
              <p><strong className="text-gray-600">Thời gian:</strong> {topic.duration}</p>
              <p><strong className="text-gray-600">Số lượng sinh viên đã được duyệt:</strong> {topic.quantityLeft}/{topic.totalQuantity}</p>
              <p><strong className="text-gray-600">Hạn chót đăng ký:</strong> {topic.endRegisterDate}</p>
              <p><strong className="text-gray-600">Bắt đầu:</strong> {topic.startDate}</p>
              <p><strong className="text-gray-600">Kết thúc:</strong> {topic.endDate}</p>
              <p><strong className="text-gray-600">Doanh nghiệp:</strong> {topic.company}</p>
              <Button onClick={() => handleRegister(topic)} className="button-color mt-2">
                <Plus size={16} /> Đăng ký
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><UploadCloud size={20} />Nộp CV</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <label 
              htmlFor="file-upload" 
              className="button-color px-2.5 py-2 rounded-lg 
              flex items-center gap-2"
            >
              <UploadCloud size={16} /> Chọn file
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
            />
            <div className="flex flex-row">
              {cvFiles.length === 0 ? (
                <div className="text-gray-500">No files uploaded</div>
              ) : (
                <Table className="min-w-full table-auto border-collapse">
                  <TableBody>
                    {cvFiles.map((file, index) => (
                      <TableRow key={file.name} className="border-b">
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
                              <Eye className="w-2 h-4 cursor-pointer hover:content-color" style={{ pointerEvents: 'auto' }}/>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteFile(index)}
                              title="Xóa File"
                            >
                              <X className="w-2 h-4 cursor-pointer hover:text-red-500" style={{ pointerEvents: 'auto' }} />
                            </Button>
                            <a
                              href={file.url}
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
            </div>
            <Button
              className="button-color rounded-lg 
              flex items-center gap-2"
              size="lg"
              onClick={handleTopicRegistration}
              disabled={cvFiles.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <UploadCloud size={16} className="animate-spin" /> Đang nộp...
                </>
              ) : (
                <>
                  <UploadCloud size={16} /> Nộp CV
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><UploadCloud size={20} />Chỉnh sửa CV</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <label 
              htmlFor="file-upload" 
              className="button-color px-2.5 py-2 rounded-lg 
              flex items-center gap-2"
            >
              <UploadCloud size={16} /> Chọn file
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
            />
            <div className="flex flex-row">
              {cvFiles.length === 0 ? (
                <div className="text-gray-500">No files uploaded</div>
              ) : (
                <Table className="min-w-full table-auto border-collapse">
                  <TableBody>
                    {cvFiles.map((file, index) => (
                      <TableRow key={file.name} className="border-b">
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
                              <Eye className="w-2 h-4 cursor-pointer hover:content-color" style={{ pointerEvents: 'auto' }}/>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteFile(index)}
                              title="Xóa File"
                            >
                              <X className="w-2 h-4 cursor-pointer hover:text-red-500" style={{ pointerEvents: 'auto' }} />
                            </Button>
                            <a
                              href={file.url}
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
            </div>
            <Button
              className="button-color rounded-lg 
              flex items-center gap-2"
              size="lg"
              onClick={handleCVUpdate}
              disabled={cvFiles.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <UploadCloud size={16} className="animate-spin" /> Đang chỉnh sửa...
                </>
              ) : (
                <>
                  <UploadCloud size={16} /> Chỉnh sửa danh sách CV
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTopicDialog} onOpenChange={setShowTopicDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-700">{selectedTopic?.name}</DialogTitle>
          </DialogHeader>
          {selectedTopic && (
            <div className="space-y-2">
              <p><strong>Mô tả:</strong> {selectedTopic.description}</p>
              <p><strong>Thời gian:</strong> {selectedTopic.duration}</p>
              <p><strong>Số lượng sinh viên được duyệt:</strong> {selectedTopic.quantityLeft}/{selectedTopic.totalQuantity}</p>
              <p><strong>Hạn chót đăng ký:</strong> {selectedTopic.endRegisterDate}</p>
              <p><strong>Bắt đầu:</strong> {selectedTopic.startDate}</p>
              <p><strong>Kết thúc:</strong> {selectedTopic.endDate}</p>
              <p><strong>Doanh nghiệp:</strong> {selectedTopic.company}</p>
              <p><strong>Trạng thái:</strong> {selectedTopic.status}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
