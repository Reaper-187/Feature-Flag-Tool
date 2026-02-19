import { AppDropdown } from "@/components/DropdownComp/Dropdown";
import { Flag } from "@/components/Flag/Flag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ListFilter } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router";

interface data {
  flagName: string;
  createdBy: string;
  createdDate: number;
  type: string;
  devSwtich: boolean;
  stageSwtich: boolean;
  prodSwtich: boolean;
}
const mockData: data[] = [
  {
    flagName: "Test API",
    createdBy: "Sassori",
    createdDate: Date.now(),
    type: "RefreshCcw",
    devSwtich: true,
    stageSwtich: false,
    prodSwtich: true,
  },
  {
    flagName: "Bug Fix Update",
    createdBy: "Abdulkader Cheikhkamis",
    createdDate: Date.now(),
    type: "RefreshCcw",
    devSwtich: true,
    stageSwtich: true,
    prodSwtich: false,
  },
  {
    flagName: "New Feature",
    createdBy: "Sassori123123",
    createdDate: Date.now(),
    type: "ChartNetwork",
    devSwtich: false,
    stageSwtich: true,
    prodSwtich: true,
  },
  {
    flagName: "Name der Flag1212",
    createdBy: "Sassori123123",
    createdDate: Date.now(),
    type: "TestTubeDiagonal",
    devSwtich: true,
    stageSwtich: false,
    prodSwtich: false,
  },
];

export const Dashboard = () => {
  const [flagData, setFlagData] = useState(mockData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchFor = e.currentTarget.value.toLowerCase();
    const res = mockData.filter((flag) =>
      flag.flagName.toLowerCase().match(searchFor),
    );
    return setFlagData(res);
  };

  const handleTypeFilter = (filterType: string) => {
    if (filterType === "") return setFlagData(mockData);

    const switchFields = ["devSwtich", "stageSwtich", "prodSwtich"] as const;

    const filtered = mockData.filter((flag) => {
      if (switchFields.includes(filterType as any)) {
        return flag[filterType as keyof data] === true;
      } else {
        return flag.type === filterType;
      }
    });

    setFlagData(filtered);
  };

  const handleSortChange = (sortType: string) => {
    if (sortType === "") return setFlagData(mockData);

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

    setFlagData(sortedData);
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
                  label: "Update",
                  onClick: () => handleTypeFilter("RefreshCcw"),
                },
                {
                  label: "Analytics",
                  onClick: () => handleTypeFilter("ChartNetwork"),
                },
                {
                  label: "Tests",
                  onClick: () => handleTypeFilter("TestTubeDiagonal"),
                  separator: true,
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

      {flagData.map((flag, index) => (
        <Flag key={index} data={flag} />
      ))}
    </>
  );
};
