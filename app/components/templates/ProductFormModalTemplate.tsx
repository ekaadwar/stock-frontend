"use client";

import { FormEvent } from "react";
import { Modal } from "../blocks/Modal";
import { Card } from "../blocks/Card";
import { TextInput } from "../units/Input";
import { TextArea } from "../units/TextArea";
import { Select } from "../units/Select";
import { Button } from "../units/Button";

type CategoryOption = {
  id: number;
  name: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  name: string;
  stock: string;
  description: string;
  categoryId: number | null;
  categories: CategoryOption[];
  onNameChange: (value: string) => void;
  onStockChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: number | null) => void;
  onCancel: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function ProductFormModalTemplate({
  open,
  mode,
  name,
  stock,
  description,
  categoryId,
  categories,
  onNameChange,
  onStockChange,
  onDescriptionChange,
  onCategoryChange,
  onCancel,
  onSubmit,
}: Props) {
  const title = mode === "create" ? "Create Product" : "Update Product";

  return (
    <Modal open={open}>
      <Card title={title} className="w-full max-w-xl">
        <form onSubmit={onSubmit} className="space-y-5">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />

          <Select
            label="Category"
            value={categoryId ?? ""}
            onChange={(e) =>
              onCategoryChange(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>

          <TextInput
            label="Stock"
            type="number"
            min={0}
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
          />

          <TextArea
            label="Label"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />

          <div className="mt-4 flex gap-4">
            {/* Cancel: hitam */}
            <Button type="button" fullWidth onClick={onCancel}>
              Cancel
            </Button>

            {/* Save: abu #666666 */}
            <Button
              type="submit"
              fullWidth
              className="bg-[#666666] text-[#F0F0F0] hover:bg-[#777777]"
            >
              Save
            </Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}
