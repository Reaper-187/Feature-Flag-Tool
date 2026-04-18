import { FlagForm } from "@/components/Flag-Form/FlagForm";
import { Button } from "@/components/ui/button";
import { useCreateFlag } from "@/hooks/flagHooks/use.createFlag";
import { useUpdateFlag } from "@/hooks/flagHooks/use.updateFlag";
import { useFlagFormValues } from "@/hooks/flagHooks/useFlagFormValues";
import type { FormOfNewFlag } from "@/types/types";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export const NewFlag = () => {
  const { flagId } = useParams();
  const isEditMode = !!flagId;
  const { initialValues, isLoading } = useFlagFormValues(flagId);
  const { mutate: createFlagMutate } = useCreateFlag();
  const { mutate: updateFlagMutate } = useUpdateFlag();
  const navigate = useNavigate();

  const handleSubmit = (data: FormOfNewFlag) => {
    if (isEditMode) {
      updateFlagMutate(
        { ...data, flagId: flagId! },
        {
          onSuccess: () => {
            navigate("/dashboard");
          },
        },
      );
    } else {
      createFlagMutate(data, {
        onSuccess: () => {
          navigate("/dashboard");
        },
      });
    }
  };

  if (isEditMode && isLoading) {
    return <div>Loading...</div>;
  }

  if (isEditMode && !initialValues) {
    return <div>Flag not found</div>;
  }
  return (
    <div>
      <Button className="flex justify-self-end mx-5">
        <Link to={"/dashboard"}>X</Link>
      </Button>
      <FlagForm
        mode={isEditMode ? "edit" : "create"}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};
