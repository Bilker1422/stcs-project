/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CustomerFormProps {
  customer?: {
    name: string;
    email: string;
    preferences: string[];
  };
  onSubmit: (customer: any) => void;
  onCancel: () => void;
}

export function CustomerForm({
  customer,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const [formData, setFormData] = useState(
    customer || {
      name: "",
      email: "",
      preferences: [],
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "preferences" ? value.split(",").map((p) => p.trim()) : value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{customer ? "Edit Customer" : "Add Customer"}</CardTitle>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Customer Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="preferences">
              Customer Preferences (comma-separated)
            </Label>
            <Input
              id="preferences"
              name="preferences"
              value={formData.preferences.join(", ")}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit(formData);
            }}
          >
            {customer ? "Update" : "Add"} Customer
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
