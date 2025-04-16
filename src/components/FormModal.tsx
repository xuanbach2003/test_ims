"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { JSX, useState } from "react";
import ExcelJS from "exceljs";


const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const CompanyForm = dynamic(() => import("./forms/CompanyForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  company: (type, data) => <CompanyForm type={type} data={data} />
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "company"
  type: "create" | "update" | "delete" ;
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-Yellow"
      : type === "update"
      ? "bg-Sky"
      : "bg-Purple";

  const [open, setOpen] = useState(false);
  const [excelData, setExcelData] = useState<any[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const workbook = new ExcelJS.Workbook();
      const reader = new FileReader();
  
      reader.onload = async (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        await workbook.xlsx.load(buffer); 
        const worksheet = workbook.worksheets[0];
        const jsonData: any[] = [];
  
        worksheet.eachRow((row, rowIndex) => {
          if (rowIndex > 1) { 
            const rowData: any = {};
            row.eachCell((cell, colIndex) => {
              rowData[`Column${colIndex}`] = cell.value;
            });
            jsonData.push(rowData);
          }
        });
  
        setExcelData(jsonData); 
        console.log("Excel Data:", jsonData); 
      };
  
      reader.readAsArrayBuffer(file);
    }
  };

const uploadDataToServer = async () => {
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(excelData), 
    });
    if (response.ok) {
      alert("Data uploaded successfully!");
    } else {
      alert("Failed to upload data.");
    }
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};


  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          Bạn có chắc muốn xóa tài khoản này{table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Xóa
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      <div className="p-4 flex flex-col gap-4">
        {forms[table](type, data)}
        {type === "create" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="excel-upload" className="font-medium">
              Upload Excel File:
            </label>
            <input
              type="file"
              id="excel-upload"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="border p-2 rounded-md"
            />
            {excelData.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium">Kiểm tra dữ liệu:</h3>
              <ul className="list-disc pl-5">
                {excelData.map((row, index) => (
                  <li key={index}>{JSON.stringify(row)}</li>
                ))}
              </ul>
              {/* Nút Upload */}
              <button
                onClick={uploadDataToServer} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Đăng lên hệ thống 
              </button>
            </div>
          )}
        </div>
        )}
      </div>
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
