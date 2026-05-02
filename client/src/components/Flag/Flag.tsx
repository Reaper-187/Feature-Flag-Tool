import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { FlagInfoComp } from "./flag-comp/FlagInfoComp";

interface FlagProps {
  data: {
    flagId: string;
    flagName: string;
    createdBy: string;
    createdDate: number;
    flagKeyName: string;
    flagRollout: number;
    description: string;
    devSwitch: boolean;
    stageSwitch: boolean;
    prodSwitch: boolean;
  };
  switchToggle: (
    flagId: string,
    field: "devSwitch" | "stageSwitch" | "prodSwitch",
  ) => void;
  openEdit: (flagId: string) => void;
  deleteFlag: (flagId: string) => void;
}

export const Flag = ({
  data,
  switchToggle,
  openEdit,
  deleteFlag,
}: FlagProps) => {
  const getStatusStyle = (isActive: boolean) => {
    if (isActive) {
      return "bg-green-200 text-green-800 border-green-300 py-1 px-2 rounded-md";
    } else {
      return "bg-red-200 text-red-800 border-red-300 py-1 px-2 rounded-md";
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row md:justify-between p-3 gap-3">
          <FlagInfoComp
            flagId={data.flagId}
            flagName={data.flagName}
            createdBy={data.createdBy}
            createdDate={data.createdDate}
            flagRollout={data.flagRollout}
            openEditFrom={openEdit}
            handleDelete={deleteFlag}
          />

          <div className="flex gap-2 md:w-1/2">
            <div className="w-full flex items-center p-1 text-sm justify-between">
              <p
                className={`${getStatusStyle(data.devSwitch)} font-medium text-sm`}
              >
                {data.devSwitch ? "active" : "inactive"}
              </p>
              <Switch
                checked={data.devSwitch}
                onCheckedChange={() => switchToggle(data.flagId, "devSwitch")}
              />
            </div>

            <div className="w-full flex items-center p-1 text-sm justify-between">
              <p
                className={`${getStatusStyle(data.stageSwitch)} font-medium text-sm`}
              >
                {data.stageSwitch ? "active" : "inactive"}
              </p>
              <Switch
                checked={data.stageSwitch}
                onCheckedChange={() => switchToggle(data.flagId, "stageSwitch")}
              />
            </div>

            <div className="w-full flex items-center p-1 text-sm justify-between">
              <p
                className={`${getStatusStyle(data.prodSwitch)} font-medium text-sm`}
              >
                {data.prodSwitch ? "active" : "inactive"}
              </p>
              <Switch
                checked={data.prodSwitch}
                onCheckedChange={() => switchToggle(data.flagId, "prodSwitch")}
              />
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </>
  );
};
