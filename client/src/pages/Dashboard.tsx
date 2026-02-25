import { AppDropdown } from "@/components/DropdownComp/Dropdown";
import { EditDialog } from "@/components/edit-dialog/EditDialog";
import { Flag } from "@/components/Flag/Flag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ListFilter } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router";
import type { FlagData, FormOfNewFlag } from "@/types/types";

const mockData: FlagData[] = [
  {
    flagId: "11234ß012340ß781ß3948ß",
    flagName: "Test API",
    flagKeyName: "Test_API",
    createdBy: "Sassori",
    createdDate: Date.now(),
    flagRollout: 25,
    description: "description",

    devSwitch: true,
    stageSwitch: false,
    prodSwitch: true,
  },
  {
    flagId: "2834u5ß02734ß0857ß2",
    flagName: "Bug Fix Update",
    flagKeyName: "Bug_Fix_Update",
    createdBy: "Abdulkader Cheikhkamis",
    createdDate: Date.now(),
    flagRollout: 25,
    description: "description",

    devSwitch: true,
    stageSwitch: true,
    prodSwitch: false,
  },
  {
    flagId: "3293485ß2345098",
    flagName: "New Feature",
    flagKeyName: "New_Feature",
    createdBy: "Sassori123123",
    createdDate: Date.now(),
    flagRollout: 25,
    description: "description",

    devSwitch: false,
    stageSwitch: true,
    prodSwitch: true,
  },
  {
    flagId: "42039457ß0374ß95872",
    flagName: "Name der Flag1212",
    flagKeyName: "Name_der_Flag1212",
    createdBy: "Sassori123123",
    createdDate: Date.now(),
    flagRollout: 25,
    description: "description",

    devSwitch: true,
    stageSwitch: false,
    prodSwitch: false,
  },
];

export const Dashboard = () => {
  const [originalFlags, setOriginalFlags] = useState<FlagData[]>(mockData);
  const [editableFlags, setEditableFlags] = useState<FlagData[]>(mockData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchFor = e.currentTarget.value.toLowerCase();
    const res = mockData.filter((flag) =>
      flag.flagName.toLowerCase().match(searchFor),
    );
    return setOriginalFlags(res);
  };

  const handleTypeFilter = (filterType: string) => {
    if (filterType === "") return setOriginalFlags(mockData);

    const switchFields = ["devSwtich", "stageSwtich", "prodSwtich"] as const;

    const filtered = mockData.filter((flag) => {
      if (switchFields.includes(filterType as any)) {
        return flag[filterType as keyof FlagData] === true;
      }
    });

    setOriginalFlags(filtered);
  };

  const handleSortChange = (sortType: string) => {
    if (sortType === "") return setOriginalFlags(mockData);

    const sortedData = [...mockData].sort((a, b) =>
      sortType === "A-Z"
        ? a.flagName.localeCompare(b.flagName)
        : sortType === "Z-A"
          ? b.flagName.localeCompare(a.flagName)
          : sortType === "Date up"
            ? b.createdDate - a.createdDate
            : sortType === "Date down"
              ? a.createdDate - b.createdDate
              : 0,
    );

    setOriginalFlags(sortedData);
  };

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

  const isDirty =
    JSON.stringify(originalFlags) !== JSON.stringify(editableFlags);

  const [showEditAlert, setShowEditAlert] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState<FlagData | null>(null);

  const handleOpenEdit = (flagId: string) => {
    const flag = originalFlags.find((flag) => flag.flagId === flagId);
    setShowEditAlert(true);
    setSelectedFlag(flag ?? null);
  };

  const handleEditFlag = (data: FormOfNewFlag) => {
    if (!selectedFlag) return;
    // später:
    // 1. API call
    // 2. redirect
    // 3. toast
    console.log("Edit:", selectedFlag.flagId, data);
  };

  return (
    <>
      <div className="flex justify-between items-center p-3">
        <h1 className="font-bold text-sm md:text-xl">Flags</h1>
        <div className="flex gap-10 items-center text-sm">
          <div className="flex gap-3">
            <AppDropdown
              triggerIcon={ListFilter}
              items={[
                {
                  label: "Reset Filter",
                  onClick: () => handleTypeFilter(""),
                },
                {
                  label: "Active Development",
                  onClick: () => handleTypeFilter("devSwtich"),
                },
                {
                  label: "Active Staging",
                  onClick: () => handleTypeFilter("stageSwtich"),
                },
                {
                  label: "Active Production",
                  onClick: () => handleTypeFilter("prodSwtich"),
                },
              ]}
            />

            <AppDropdown
              triggerIcon={ArrowDownUp}
              items={[
                {
                  label: "Reset Sort",
                  onClick: () => handleSortChange(""),
                },
                {
                  label: "[A-Z]",
                  onClick: () => handleSortChange("A-Z"),
                },
                {
                  label: "[Z-A]",
                  onClick: () => handleSortChange("Z-A"),
                  separator: true,
                },
                {
                  label: "Date up",
                  onClick: () => handleSortChange("Date up"),
                },
                {
                  label: "Date down",
                  onClick: () => handleSortChange("Date down"),
                  separator: true,
                },
              ]}
            />
          </div>
          <Link to={"/create-new-feature-flag"}>
            <Button>+ Create flag</Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-between px-3">
        <Input
          className="w-1/5"
          placeholder="Search flags by name"
          type="text"
          onChange={handleInputChange}
        />
        <div className="flex gap-2 w-1/2 ">
          <div className="bg-gray-200 w-full flex items-center py-1 px-3 rounded-md gap-3">
            <span className="w-[15px] h-[15px] bg-purple-500 rounded-full"></span>
            <p>Development</p>
          </div>
          <div className="bg-gray-200 w-full flex items-center py-1 px-3 rounded-md gap-3">
            <span className="w-[15px] h-[15px] bg-blue-500 rounded-full"></span>
            <p>Staging</p>
          </div>
          <div className="bg-gray-200 w-full flex items-center py-1 px-3 rounded-md gap-3">
            <span className="w-[15px] h-[15px] bg-red-500 rounded-full"></span>
            <p>Production</p>
          </div>
        </div>
      </div>

      {editableFlags.map((flag) => (
        <Flag
          key={flag.flagId}
          data={flag}
          switchToggle={handleToggleSwitch}
          editAlert={handleOpenEdit}
        />
      ))}
      <Button className={isDirty ? `block` : `hidden`}>Save changes</Button>
      <EditDialog
        showEditAlert={showEditAlert}
        closeAlert={setShowEditAlert}
        editFlagData={selectedFlag}
        editSubmit={handleEditFlag}
      />
    </>
  );
};
