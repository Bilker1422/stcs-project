/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormProps {
  product: {
    name: string;
    description: string;
    price: string;
  };
  onChange: (product: any) => void;
}

export function ProductForm({ product, onChange }: ProductFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Product Information</h2>
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          value={product.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="productDescription">Product Description</Label>
        <Textarea
          id="productDescription"
          value={product.description}
          onChange={(e) =>
            onChange({ ...product, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="productPrice">Product Price</Label>
        <Input
          id="productPrice"
          type="number"
          step="0.01"
          value={product.price}
          onChange={(e) => onChange({ ...product, price: e.target.value })}
          required
        />
      </div>
    </div>
  );
}
