import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

interface ConfirmationModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel(); }}>
      <DialogContent
        showCloseButton={false}
        className="rounded-2xl shadow-md max-w-md p-8"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {message && <DialogDescription>{message}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <ShimmerButton
              type="button"
              className="px-4 py-2"
              onClick={onCancel}
            >
              {cancelText}
            </ShimmerButton>
          </DialogClose>
          <ShimmerButton
            type="button"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            {confirmText}
          </ShimmerButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 