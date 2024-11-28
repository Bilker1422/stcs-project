/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

interface ExcelUploadProps {
  onUpload: (customers: any[]) => void;
}

export function ExcelUpload({ onUpload }: ExcelUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Check if headers match
        const headers = Object.keys(jsonData[0]);
        if (
          headers.includes("name") &&
          headers.includes("email") &&
          headers.includes("preferences")
        ) {
          const customers = jsonData.map((row: any) => ({
            name: row.name,
            email: row.email,
            preferences: row.preferences
              .split(",")
              .map((p: string) => p.trim()),
          }));
          onUpload(customers);
        } else {
          alert(
            "Excel file headers do not match. Please ensure you have columns for name, email, and preferences."
          );
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      <h3 className="text-lg font-semibold">Upload Customer Data (Excel)</h3>
      <div className="space-y-2">
        <Label htmlFor="excelFile">Excel File</Label>
        <Input
          id="excelFile"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />
      </div>
      <Button onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
      {file && (
        <p className="text-sm text-muted-foreground mt-2">
          Selected file: {file.name}
        </p>
      )}
    </div>
  );
}
