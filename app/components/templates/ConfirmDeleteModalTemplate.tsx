"use client";

import { Modal } from "../blocks/Modal";
import { Card } from "../blocks/Card";
import { Button } from "../units/Button";

type Props = {
  open: boolean;
  categoryName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteModalTemplate({
  open,
  categoryName,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal open={open}>
      <Card className="w-full max-w-xl">
        <div className="space-y-6">
          <p className="text-center text-xl font-semibold">
            Are you sure want to remove
            <span className="font-bold"> {categoryName}</span>?
          </p>

          <div className="mt-4 flex gap-4">
            <Button type="button" fullWidth onClick={onCancel}>
              Cancel
            </Button>

            {/* Yes: #666666 / #F0F0F0 */}
            <Button
              type="button"
              fullWidth
              className="bg-[#666666] text-[#F0F0F0] hover:bg-[#777777]"
              onClick={onConfirm}
            >
              Yes
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
}
