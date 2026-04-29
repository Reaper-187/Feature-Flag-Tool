import { Flag } from "@/components/Flag/Flag";
import type { FlagData } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

interface FlagListProps {
  flags: FlagData[];
  onToggleSwitch: (
    flagId: string,
    field: "devSwitch" | "stageSwitch" | "prodSwitch",
  ) => void;
  onEdit: (flagId: string) => void;
  onDelete: (flagId: string) => void;
  isLoading: boolean;
}

export const FlagList = ({
  flags,
  onToggleSwitch,
  onEdit,
  onDelete,
  isLoading,
}: FlagListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3">
            <div className="flex justify-between">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex gap-2 w-1/2">
                <div className="w-full flex items-center justify-between">
                  <Skeleton className="h-7 w-16 rounded-md" />
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
                <div className="w-full flex items-center justify-between">
                  <Skeleton className="h-7 w-16 rounded-md" />
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
                <div className="w-full flex items-center justify-between">
                  <Skeleton className="h-7 w-16 rounded-md" />
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (flags.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No flags found. Create your first flag!
      </div>
    );
  }

  return (
    <>
      {flags.map((flag) => (
        <Flag
          key={flag.flagId}
          data={flag}
          switchToggle={onToggleSwitch}
          openEdit={onEdit}
          deleteFlag={onDelete}
        />
      ))}
    </>
  );
};
