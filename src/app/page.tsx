/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExcelUpload } from "@/components/excel-upload";
import { SenderForm } from "@/components/sender-form";
import { ProductForm } from "@/components/product-form";
import { CustomerForm } from "@/components/customer-form";

export default function Home() {
  const [formData, setFormData] = useState({
    product: {
      name: "",
      description: "",
      price: "",
    },
    customers: [],
    sender: {
      companyName: "",
      fromEmail: "",
    },
  });

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const handleFormChange = (section: string, data: any) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const handleCustomerUpload = (customers: any[]) => {
    setFormData((prev) => ({ ...prev, customers }));
    setIsFileUploaded(true);
  };

  const handleAddCustomer = (customer: any) => {
    setFormData((prev) => ({
      ...prev,
      customers: [...prev.customers, customer],
    }));
    setShowAddCustomer(false);
  };

  const handleRemoveCustomer = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customers: prev.customers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://hook.eu2.make.com/nq85l9l51zfi16tidx4me9okwjcgv8hd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Product and Customer Information</CardTitle>
          <CardDescription>
            Please fill out the following information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <ProductForm
              product={formData.product}
              onChange={(data) => handleFormChange("product", data)}
            />
            <SenderForm
              sender={formData.sender}
              onChange={(data) => handleFormChange("sender", data)}
            />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Customer Information</h2>
              <ExcelUpload onUpload={handleCustomerUpload} />
              {isFileUploaded ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Uploaded Customers</h3>
                </div>
              ) : (
                <>
                  {showAddCustomer ? (
                    <CustomerForm
                      onSubmit={handleAddCustomer}
                      onCancel={() => setShowAddCustomer(false)}
                    />
                  ) : (
                    <Button
                      type="button"
                      onClick={() => setShowAddCustomer(true)}
                      variant="outline"
                    >
                      Add Customer
                    </Button>
                  )}
                </>
              )}
              {formData.customers.map((customer, index) => (
                <div key={index} className="p-4 border rounded space-y-2">
                  <p>
                    <strong>Name:</strong> {customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p>
                    <strong>Preferences:</strong>{" "}
                    {customer.preferences.join(", ")}
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveCustomer(index)}
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
