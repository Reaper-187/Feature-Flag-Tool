import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { FlagData } from "@/pages/Dashboard";

interface AlertProps {
  showEditAlert: boolean;
  closeAlert: (value: boolean) => void;
  editFlagData: FlagData | null;
  onSave: (updated: Partial<FlagData>) => void;
}

export const EditAlert = ({
  showEditAlert,
  closeAlert,
  editFlagData,
}: AlertProps) => {
  if (!editFlagData) return null;

  return (
    <Dialog open={showEditAlert} onOpenChange={closeAlert}>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Edit Feature Flag</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">...</div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => closeAlert(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
