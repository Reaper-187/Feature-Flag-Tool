import { FlagForm } from "@/components/Flag-Form/FlagForm";
import { Button } from "@/components/ui/button";
import { useCreateFlag } from "@/hooks/flagHooks/use.createFlag";
import type { FormOfNewFlag } from "@/types/types";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

export const NewFlag = () => {
  const { mutate } = useCreateFlag();
  const navigate = useNavigate();
  const handleCreate = (data: FormOfNewFlag) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
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
