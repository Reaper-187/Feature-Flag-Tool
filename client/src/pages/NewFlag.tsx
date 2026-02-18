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
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router";
import { ChartNetwork, RefreshCcw, TestTubeDiagonal } from "lucide-react";

const formSchema = z.object({
  flagName: z.string(),
  flagKeyName: z.string(),
  description: z.string().optional(),
  tags: z.string().optional(),
  flagVari: z.string(),
  flagType: z.string(),
});

type FormOfNewFlag = z.infer<typeof formSchema>;

type FlagVariations = "Boolean" | "String" | "Number" | "JSON";
type FlagType = "Update" | "Analytics" | "Test";

export const NewFlag = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormOfNewFlag>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flagVari: "boolean",
    },
  });
  const [isManualKey, setIsManualKey] = useState(false);
  const flagName = watch("flagName");

  useEffect(() => {
    if (!isManualKey && flagName) {
      const formatedFlagName = flagName.split(" ").join("_");
      setValue("flagKeyName", formatedFlagName);
    }
  }, [flagName, isManualKey, setValue]);

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsManualKey(true);
    setValue("flagKeyName", e.currentTarget.value.trim());
  };
  const handleNewFlag = (data: FormOfNewFlag) => {
    console.log(data);
  };

  const flagVariations: { value: string; label: FlagVariations }[] = [
    { value: "boolean", label: "Boolean" },
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "json", label: "JSON" },
  ];

  const flagTypes: {
    value: string;
    label: FlagType;
    icon: React.ElementType;
  }[] = [
    { value: "update", label: "Update", icon: RefreshCcw },
    { value: "analytics", label: "Analytics", icon: ChartNetwork },
    { value: "test", label: "Test", icon: TestTubeDiagonal },
  ];

  return (
    <form className="p-5" onSubmit={handleSubmit(handleNewFlag)}>
      <h1 className="text-md font-bold md:my-5 md:text-xl">
        Create a feature flag
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
          <Input {...register("flagKeyName")} onChange={handleKeyChange} />
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
          <Label className="text-xs md:text-lg">
            Tags <span className="text-xs text-gray-400">(optional)</span>
          </Label>
          <Input {...register("tags")} />
          {errors.tags && (
            <p className="text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Flag variations</Label>
          <Controller
            control={control}
            name="flagVari"
            render={({ field }) => (
              <>
                <Select
                  defaultValue="boolean"
                  value={field.value || "boolean"}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="variations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {flagVariations.map((variation) => (
                        <SelectItem
                          key={variation.value}
                          value={variation.value}
                        >
                          {variation.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            )}
          />
          <p className="text-sm text-gray-400">
            This controls the evaluation return type of your flag in your Code.
          </p>
        </div>
        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Type</Label>
          <Controller
            control={control}
            name="flagType"
            render={({ field }) => (
              <>
                <Select
                  defaultValue="update"
                  value={field.value || "update"}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="variations" />
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
              </>
            )}
          />
        </div>
      </div>

      <Separator className="my-5"></Separator>
      <div className="flex justify-between">
        <Link to={"/dashboard"}>
          <Button className="bg-red-400 cursor-pointer">Cancle</Button>
        </Link>
        <Button type="submit" className="cursor-pointer">
          Create Flag
        </Button>
      </div>
    </form>
  );
};
