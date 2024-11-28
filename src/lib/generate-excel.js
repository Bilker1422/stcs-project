import * as XLSX from "xlsx";
import { writeFile } from "fs/promises";

// Sample customer data
const customers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    preferences: "fitness, technology, health",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    preferences: "cooking, health, fitness",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    preferences: "technology, gadgets, sports",
  },
];

// Create a new workbook and worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(customers);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

// Generate buffer
const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

// Save the buffer to a file
const fileName = "customer_data.xlsx";
await writeFile(fileName, excelBuffer);

console.log(`Excel file '${fileName}' generated successfully!`);
console.log(
  "Number of rows (including header):",
  worksheet["!ref"].split(":")[1].replace(/[A-Z]/g, "")
);
console.log("Columns:", Object.keys(customers[0]).join(", "));

// To demonstrate the content, let's convert the first row back to JSON
const firstRow = XLSX.utils.sheet_to_json(worksheet)[0];
console.log("First row data:", JSON.stringify(firstRow, null, 2));
