import * as Icons from "lucide-react";
import { AppDropdown } from "@/components/DropdownComp/Dropdown";

interface FlagInfo {
  flagId: string;
  flagName: string;
  createdBy: string;
  createdDate: number;
  openEditAlert: (flagId: string) => void;
  handleDelete: (flagId: string) => void;
}

export const FlagInfoComp = ({
  flagId,
  flagName,
  createdBy,
  createdDate,
  openEditAlert,
  handleDelete,
}: FlagInfo) => {
  return (
    <div key={flagId}>
      <h3 className="font-bold">{flagName}</h3>
      <div className="grid grid-cols-[120px_100px_80px_auto] gap-3 items-center text-xs text-gray-400">
        <p className="truncate">{createdBy}</p>
        <p>{createdDate}</p>
        <AppDropdown
          triggerIcon={Icons.Pencil}
          items={[
            {
              label: "Delete",
              onClick: () => handleDelete(flagId),
              separator: true,
            },
            {
              label: "Edit",
              onClick: () => openEditAlert(flagId),
              separator: true,
            },
            {
              label: "Hide",
              /*onClick: () => handleHide(),*/
            },
          ]}
        />
      </div>
    </div>
  );
};
