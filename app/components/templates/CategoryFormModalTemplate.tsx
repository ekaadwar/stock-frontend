"use client";

import { FormEvent } from "react";
import { Modal } from "../blocks/Modal";
import { Card } from "../blocks/Card";
import { TextInput } from "../units/Input";
import { TextArea } from "../units/TextArea";
import { Button } from "../units/Button";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function CategoryFormModalTemplate({
  open,
  mode,
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onCancel,
  onSubmit,
}: Props) {
  const title = mode === "create" ? "Create Category" : "Update Category";

  return (
    <Modal open={open}>
      <Card title={title} className="w-full max-w-xl">
        <form onSubmit={onSubmit} className="space-y-5">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />

          <TextArea
            label="Description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />

          <div className="mt-4 flex gap-4">
            {/* Cancel: hitam (default Button) */}
            <Button type="button" fullWidth onClick={onCancel}>
              Cancel
            </Button>

            {/* Save: #666666 / #F0F0F0 */}
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
