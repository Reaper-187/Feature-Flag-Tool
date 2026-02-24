import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type ChangeEvent } from "react";
import { Slider } from "@/components/ui/slider";
import { flagTypes, formSchema, type FormOfNewFlag } from "@/types/types";

interface FlagFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<FormOfNewFlag>;
  onSubmit: (data: FormOfNewFlag) => void;
}

export const FlagForm = ({ mode, initialValues, onSubmit }: FlagFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormOfNewFlag>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "create"
        ? {
            flagType: "update",
            flagRollout: [0],
          }
        : {
            flagType: initialValues?.flagType ?? "update",
            flagRollout: initialValues?.flagRollout ?? [0],
            flagName: initialValues?.flagName ?? "",
            flagKeyName: initialValues?.flagKeyName ?? "",
            description: initialValues?.description ?? "",
          },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const [isManualKey, setIsManualKey] = useState(false);
  const flagName = watch("flagName");

  useEffect(() => {
    if (mode === "create" && !isManualKey && flagName) {
      const formatedFlagName = flagName.split(" ").join("_");
      setValue("flagKeyName", formatedFlagName);
    }
  }, [flagName, isManualKey, setValue]);

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsManualKey(true);
    setValue("flagKeyName", e.currentTarget.value.trim());
  };

  return (
    <form
      className={mode === "create" ? "p-5" : ""}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-md font-bold md:my-5 md:text-xl">
        {mode === "create" ? "Create a feature flag" : "Edit feature flag"}
      </h1>
      <h3>
        A feature flag lets you controle who can see particular feature in your
        app.
      </h3>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Name</Label>
          <Input placeholder="Eg. New Update" {...register("flagName")} />
          {errors.flagName && (
            <p className="text-sm text-red-500">{errors.flagName.message}</p>
          )}

          <p className="text-sm text-gray-400">
            A human-friendly name for your feature.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Key</Label>
          <Input
            {...register("flagKeyName")}
            onChange={handleKeyChange}
            disabled={mode === "edit"}
          />
          {errors.flagKeyName && (
            <p className="text-sm text-red-500">{errors.flagKeyName.message}</p>
          )}

          <p className="text-sm text-gray-400">
            Use this key in your code. Keys must only contain letters, numbers,
            <span className="px-2 bg-gray-300 text-black rounded-md">.</span>,
            <span className="px-2 bg-gray-300 text-black rounded-md">_</span> or
            <span className="px-2 bg-gray-300 text-black rounded-md">-</span>,
            You can not use{" "}
            <span className="font-semibold text-black">new</span> as a Key
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-xs md:text-lg">
            Description
            <span className="text-xs text-gray-400">(optional)</span>
          </Label>
          <Input
            placeholder="Describe what this feature flag controls"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Type</Label>
          <Controller
            control={control}
            name="flagType"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {flagTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.label}
                          <type.icon size={16} />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-xs md:text-lg">Rollout</Label>
          <Controller
            control={control}
            name="flagRollout"
            render={({ field }) => (
              <div className="flex gap-3">
                <Slider
                  className="w-2/5"
                  value={field.value}
                  onValueChange={field.onChange}
                  min={0}
                  max={100}
                  step={25}
                />
                <span>{field.value}%</span>
              </div>
            )}
          />
        </div>
      </div>

      <Separator className="my-5"></Separator>

      <Button type="submit" className="cursor-pointer">
        {mode === "create" ? "Create Flag" : "Save Changes"}
      </Button>
    </form>
  );
};
