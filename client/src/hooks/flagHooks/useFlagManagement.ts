import { useState, useEffect } from "react";
import type { FlagData } from "@/types/types";
import { getChangedFlags } from "@/utils/getChangedFlag";
import { useDeleteFlag } from "./use.deleteFlag";
import { toast } from "sonner";

export const useFlagManagement = (fetchedFlags: FlagData[] | undefined) => {
  const [serverFlags, setServerFlags] = useState<FlagData[]>(
    fetchedFlags || [],
  );
  const [editableFlags, setEditableFlags] = useState<FlagData[]>(
    fetchedFlags || [],
  );
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState<FlagData | null>(null);

  useEffect(() => {
    if (fetchedFlags) {
      setServerFlags(fetchedFlags);
      setEditableFlags(fetchedFlags);
    }
  }, [fetchedFlags]);

  const handleToggleSwitch = (
    flagIdForChange: string,
    fieldSwitch: "devSwitch" | "stageSwitch" | "prodSwitch",
  ) => {
    setEditableFlags((prevFlags) =>
      prevFlags.map((flag) =>
        flag.flagId === flagIdForChange
          ? { ...flag, [fieldSwitch]: !flag[fieldSwitch] }
          : flag,
      ),
    );
  };

  const handleSaveChanges = () => {
    const changes = getChangedFlags(serverFlags, editableFlags);
    if (changes.length === 0) return;
    console.log("Sending changes to backend:", changes);
    setServerFlags(editableFlags);
    return changes;
  };

  const handleOpenEdit = (flagId: string) => {
    const flag = serverFlags.find((flag) => flag.flagId === flagId);
    setShowEditAlert(true);
    setSelectedFlag(flag ?? null);
  };

  const isDirty = JSON.stringify(serverFlags) !== JSON.stringify(editableFlags);

  const { mutate } = useDeleteFlag();
  const handleDeleteReq = (flagId: string) => {
    mutate(flagId);
  };

  return {
    serverFlags,
    editableFlags,
    setServerFlags,
    showEditAlert,
    setShowEditAlert,
    selectedFlag,
    handleToggleSwitch,
    handleSaveChanges,
    handleOpenEdit,
    isDirty,
    handleDeleteReq,
  };
};
