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
  return (
    <>
      <div>
        <div>
          <div className="flex justify-between p-3">
            <FlagInfoComp
              flagId={data.flagId}
              flagName={data.flagName}
              createdBy={data.createdBy}
              createdDate={data.createdDate}
              openEditFrom={openEdit}
              handleDelete={deleteFlag}
            />
            <div className="flex gap-2 w-1/2 ">
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch
                  checked={data.devSwitch}
                  onCheckedChange={() => switchToggle(data.flagId, "devSwitch")}
                />
              </div>
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch
                  checked={data.stageSwitch}
                  onCheckedChange={() =>
                    switchToggle(data.flagId, "stageSwitch")
                  }
                />
              </div>
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch
                  checked={data.prodSwitch}
                  onCheckedChange={() =>
                    switchToggle(data.flagId, "prodSwitch")
                  }
                />
              </div>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </>
  );
};
