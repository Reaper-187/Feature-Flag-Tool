import { useState, useEffect } from "react";
import type { FlagData } from "@/types/types";
import { getChangedFlags } from "@/utils/getChangedFlag";
import { useDeleteFlag } from "./use.deleteFlag";
import { useNavigate } from "react-router-dom";
import { useBatchUpdateSwitches } from "./use.batchUpdateSwitches";

export const useFlagManagement = (fetchedFlags: FlagData[] | undefined) => {
  const { mutate: deleteFlag } = useDeleteFlag();
  const { mutate: batchUpdate } = useBatchUpdateSwitches();

  const navigate = useNavigate();
  const [serverFlags, setServerFlags] = useState<FlagData[]>(
    fetchedFlags || [],
  );
  const [editableFlags, setEditableFlags] = useState<FlagData[]>(
    fetchedFlags || [],
  );

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

    batchUpdate(changes, {
      onSuccess: () => {
        setServerFlags(editableFlags);
      },
    });
  };
  const handleEdit = (flagId: string) => {
    navigate(`/flags/${flagId}/edit`);
  };

  const isDirty = JSON.stringify(serverFlags) !== JSON.stringify(editableFlags);

  const handleDeleteReq = (flagId: string) => {
    if (confirm("Are you sure you want to delete this flag?")) {
      deleteFlag(flagId);
    }
  };

  return {
    isDirty,
    serverFlags,
    editableFlags,
    setServerFlags,
    handleDeleteReq,
    handleSaveChanges,
    handleToggleSwitch,
    handleEdit,
  };
};
