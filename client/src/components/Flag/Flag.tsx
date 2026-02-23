import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { FlagInfoComp } from "./flag-comp/FlagInfoComp";

interface FlagProps {
  data: {
    flagId: string;
    flagName: string;
    createdBy: string;
    createdDate: number;
    type: string;
    devSwtich: boolean;
    stageSwtich: boolean;
    prodSwtich: boolean;
  };
  switchToggle: (
    flagId: string,
    field: "devSwtich" | "stageSwtich" | "prodSwtich",
  ) => void;
  editAlert: (flagId: string) => void;
}

export const Flag = ({ data, switchToggle, editAlert }: FlagProps) => {
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
              type={data.type}
              openEditAlert={editAlert}
            />
            <div className="flex gap-2 w-1/2 ">
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch
                  checked={data.devSwtich}
                  onCheckedChange={() => switchToggle(data.flagId, "devSwtich")}
                />
              </div>
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch
                  checked={data.stageSwtich}
                  onCheckedChange={() =>
                    switchToggle(data.flagId, "stageSwtich")
                  }
                />
              </div>
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch
                  checked={data.prodSwtich}
                  onCheckedChange={() =>
                    switchToggle(data.flagId, "prodSwtich")
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
