import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import type { FlagData, FormOfNewFlag } from "@/types/types";
import { FlagForm } from "../Flag-Form/FlagForm";

interface AlertProps {
  showEditAlert: boolean;
  closeAlert: (value: boolean) => void;
  editFlagData: FlagData | null;
  editSubmit: (data: FormOfNewFlag) => void;
}

export const EditDialog = ({
  showEditAlert,
  closeAlert,
  editFlagData,
  editSubmit,
}: AlertProps) => {
  if (!editFlagData) return null;

  const mappedInitialValues: FormOfNewFlag = {
    flagName: editFlagData.flagName,
    flagKeyName: editFlagData.flagKeyName,
    description: editFlagData.description,
    flagRollout: [editFlagData.flagRollout],
    devSwitch: editFlagData.devSwitch,
    stageSwitch: editFlagData.stageSwitch,
    prodSwitch: editFlagData.prodSwitch,
  };

  return (
    <Dialog open={showEditAlert} onOpenChange={closeAlert}>
      <DialogTitle hidden></DialogTitle>
      <DialogContent>
        <FlagForm
          mode="edit"
          onSubmit={editSubmit}
          initialValues={mappedInitialValues}
        />
      </DialogContent>
    </Dialog>
  );
};
