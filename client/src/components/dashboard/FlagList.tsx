import { Flag } from "@/components/Flag/Flag";
import type { FlagData } from "@/types/types";

interface FlagListProps {
  flags: FlagData[];
  onToggleSwitch: (
    flagId: string,
    field: "devSwitch" | "stageSwitch" | "prodSwitch",
  ) => void;
  onEdit: (flagId: string) => void;
  onDelete: (flagId: string) => void;
}

export const FlagList = ({
  flags,
  onToggleSwitch,
  onEdit,
  onDelete,
}: FlagListProps) => {
  if (flags.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">No flags found</div>
    );
  }

  return (
    <>
      {flags.map((flag) => (
        <Flag
          key={flag.flagId}
          data={flag}
          switchToggle={onToggleSwitch}
          editAlert={onEdit}
          deleteFlag={onDelete}
        />
      ))}
    </>
  );
};
