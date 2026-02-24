import { FlagForm } from "@/components/Flag-Form/FlagForm";
import { Button } from "@/components/ui/button";
import type { FormOfNewFlag } from "@/types/types";
import { Link } from "react-router";

export const NewFlag = () => {
  const handleCreate = (data: FormOfNewFlag) => {
    // später:
    // 1. API call
    // 2. redirect
    // 3. toast
    console.log("Create:", data);
  };

  return (
    <div>
      <Button className="flex justify-self-end mx-5">
        <Link to={"/dashboard"}>X</Link>
      </Button>
      <FlagForm mode="create" onSubmit={handleCreate} />
    </div>
  );
};
