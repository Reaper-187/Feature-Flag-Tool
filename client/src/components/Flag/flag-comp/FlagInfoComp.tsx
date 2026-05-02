import * as Icons from "lucide-react";
import { AppDropdown } from "@/components/DropdownComp/Dropdown";

interface FlagInfo {
  flagId: string;
  flagName: string;
  createdBy: string;
  flagRollout: number;
  createdDate: number;
  openEditFrom: (flagId: string) => void;
  handleDelete: (flagId: string) => void;
}

export const FlagInfoComp = ({
  flagId,
  flagName,
  createdBy,
  createdDate,
  flagRollout,
  openEditFrom,
  handleDelete,
}: FlagInfo) => {
  return (
    <div key={flagId} className="flex items-center gap-3">
      <h3 className="font-bold">{flagName}</h3>
      <div className="grid grid-cols-[100px_120px_80px_auto] gap-3 items-center text-xs text-gray-400">
        <p className="truncate">user: {createdBy}</p>
        <p className="">
          User-Rollout: <span className="mx-2 font-bold">{flagRollout}%</span>
        </p>
        <p>
          {new Date(createdDate).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
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
              onClick: () => openEditFrom(flagId),
              separator: true,
            },
          ]}
        />
      </div>
    </div>
  );
};
