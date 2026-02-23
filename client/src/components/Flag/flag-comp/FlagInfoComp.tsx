import * as Icons from "lucide-react";
import { AppDropdown } from "@/components/DropdownComp/Dropdown";

interface FlagInfo {
  flagId: string;
  flagName: string;
  createdBy: string;
  createdDate: number;
  type: string;
  openEditAlert: (flagId: string) => void;
}

export const FlagInfoComp = ({
  flagId,
  flagName,
  createdBy,
  createdDate,
  type,
  openEditAlert,
}: FlagInfo) => {
  const IconComponent = (Icons as any)[type] || Icons.HelpCircle;

  return (
    <div key={flagId}>
      <h3 className="font-bold">{flagName}</h3>
      <div className="grid grid-cols-[120px_100px_80px_auto] gap-3 items-center text-xs text-gray-400">
        <p className="truncate">{createdBy}</p>
        <p>{createdDate}</p>
        <p className="flex gap-2 items-center">
          Type: <IconComponent size={17} />
        </p>
        <AppDropdown
          triggerIcon={Icons.Pencil}
          items={[
            {
              label: "Delete",
              /*onClick: () => handleDelete(),*/
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
