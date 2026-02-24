import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import type { FlagData, FormOfNewFlag } from "@/types/types";
import { FlagForm } from "../Flag-Form/FlagForm";

interface AlertProps {
  showEditAlert: boolean;
  closeAlert: (value: boolean) => void;
  editFlagData: FlagData | null;
}

export const EditDialog = ({
  showEditAlert,
  closeAlert,
  editFlagData,
}: AlertProps) => {
  if (!editFlagData) return null;

  const handleEditFlag = (data: FormOfNewFlag) => {
    // später:
    // 1. API call
    // 2. redirect
    // 3. toast
    console.log("Edit:", data);
  };

  return (
    <Dialog open={showEditAlert} onOpenChange={closeAlert}>
      <DialogContent>
        <form>
          <DialogHeader></DialogHeader>
          <FlagForm mode="edit" onSubmit={handleEditFlag} />
          <Separator className="my-5"></Separator>
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
