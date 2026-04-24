import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center p-3">
      <h1 className="font-bold text-sm md:text-xl">Flags</h1>
      <Link to="/create-new-feature-flag">
        <Button>+ Create flag</Button>
      </Link>
    </div>
  );
};
