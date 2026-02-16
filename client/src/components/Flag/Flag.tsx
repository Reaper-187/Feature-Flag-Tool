import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { FlagInfoComp } from "./flag-comp/FlagInfoComp";

interface FlagData {
  data: {
    flagName: string;
    createdBy: string;
    createdDate: number;
    type: string;
    devSwtich: boolean;
    stageSwtich: boolean;
    prodSwtich: boolean;
  };
}

export const Flag = ({ data }: FlagData) => {
  return (
    <>
      <div>
        <div>
          <div className="flex justify-between p-3">
            <FlagInfoComp
              flagName={data.flagName}
              createdBy={data.createdBy}
              createdDate={data.createdDate}
              type={data.type}
            />
            <div className="flex gap-2 w-1/2 ">
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch checked={data.devSwtich} />
              </div>
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch checked={data.stageSwtich} />
              </div>
              <div className="w-full flex items-center p-1 text-xs justify-between">
                <p className="text-gray-400">Evaluated X days ago</p>
                <Switch checked={data.prodSwtich} />
              </div>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </>
  );
};
