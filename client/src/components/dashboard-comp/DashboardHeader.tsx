import { CreateFlag } from "../Button/CreateFlag";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center p-3">
      <h1 className="font-bold text-sm md:text-xl">Flags</h1>
      <div className="hidden md:block">
        <CreateFlag />
      </div>
    </div>
  );
};
