interface FlagDiffData {
  flagId: string;
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;
}

interface ChangedFlag {
  flagId: string;
  devSwitch?: boolean;
  stageSwitch?: boolean;
  prodSwitch?: boolean;
}

export function getChangedFlags(
  originalFlags: FlagDiffData[],
  editFlags: FlagDiffData[],
): ChangedFlag[] {
  // Map erstellen, um OriginalFlags mit flagId zu finden
  const originalMap = new Map(originalFlags.map((flag) => [flag.flagId, flag]));

  const changedFlags: ChangedFlag[] = [];

  for (const edited of editFlags) {
    const original = originalMap.get(edited.flagId);
    if (!original) continue; // falls flagId im Original nicht existiert, skip

    const changes: ChangedFlag = { flagId: edited.flagId };

    // jede Switch vergleichen und nur hinzufüge wenn sich etwas geändert hat
    if (edited.devSwitch !== original.devSwitch)
      changes.devSwitch = edited.devSwitch;
    if (edited.stageSwitch !== original.stageSwitch)
      changes.stageSwitch = edited.stageSwitch;
    if (edited.prodSwitch !== original.prodSwitch)
      changes.prodSwitch = edited.prodSwitch;

    // nur hinzufügen wenn eine Änderung vorliegt
    if (Object.keys(changes).length > 1) {
      changedFlags.push(changes);
    }
  }

  return changedFlags;
}
