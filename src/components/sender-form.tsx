/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SenderFormProps {
  sender: {
    companyName: string;
    fromEmail: string;
  };
  onChange: (sender: any) => void;
}

export function SenderForm({ sender, onChange }: SenderFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Sender Information</h2>
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={sender.companyName}
          onChange={(e) => onChange({ ...sender, companyName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="fromEmail">From Email</Label>
        <Input
          id="fromEmail"
          type="email"
          value={sender.fromEmail}
          onChange={(e) => onChange({ ...sender, fromEmail: e.target.value })}
          required
        />
      </div>
    </div>
  );
}
