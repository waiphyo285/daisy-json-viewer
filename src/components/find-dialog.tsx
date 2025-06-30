// src/components/FindDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FindDialogProps {
  open: boolean;
  mode: "find" | "next" | "prev" | null;
  query: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const modeTitles: Record<"find" | "next" | "prev", string> = {
  find: "Find",
  next: "Find Next",
  prev: "Find Previous",
};

export function FindDialog({
  open,
  mode,
  query,
  onChange,
  onClose,
  onSubmit,
}: FindDialogProps) {
  const title = mode ? modeTitles[mode] : "Find";
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Input
          autoFocus
          placeholder="Enter text to find"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
        />

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSubmit}>Find</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
