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
import { useState, type ChangeEvent } from "react";

const formSchema = z.object({
  flagName: z.string(),
  flagKeyName: z.string(),
  description: z.string().optional(),
  tags: z.string().optional(),
  flagVari: z.string(),
});

type FormOfNewFlag = z.infer<typeof formSchema>;

export const NewFlag = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormOfNewFlag>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flagVari: "boolean",
    },
  });
  const [keyFlag, setKeyFlag] = useState("");

  const handleFlagName = (e: ChangeEvent<HTMLInputElement>) => {
    let flagName = e.currentTarget.value;
    let formatedFlagName = flagName.split(" ").join("_");
    setKeyFlag(formatedFlagName);
  };
  const handleNewFlag = (data: FormOfNewFlag) => {
    console.log(data);
  };

  console.log(keyFlag);
  return (
    <form className="p-5 m-5" onSubmit={handleSubmit(handleNewFlag)}>
      <h1 className="font-bold">Create a feature flag</h1>
      <h3>
        A feature flag lets you controle who can see particular feature in your
        app.
      </h3>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Name</Label>
          <Input
            placeholder="Eg. New Update"
            {...register("flagName")}
            onChange={handleFlagName}
          />
          {errors.flagName && (
            <p className="text-sm text-red-500">{errors.flagName.message}</p>
          )}

          <p className="text-sm text-gray-400">
            A human-friendly name for your feature.
          </p>
        </div>
        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Key</Label>
          <Input {...register("flagKeyName")} value={keyFlag} />
          {errors.flagKeyName && (
            <p className="text-sm text-red-500">{errors.flagKeyName.message}</p>
          )}
          <p className="text-sm text-gray-400">
            Use this key in your code. Keys must only contain letters, numbers,
            <span className="px-2 bg-gray-300 rounded-md">.</span>,
            <span className="px-2 bg-gray-300 rounded-md">_</span> or
            <span className="px-2 bg-gray-300 rounded-md">-</span>, You can not
            use <span className="font-semibold">new</span> as a Key
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
      </div>

      <div className="space-y-2">
        <Label>Flag variations</Label>
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
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
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
      <Separator></Separator>
      <Button type="submit">Create Flag</Button>
    </form>
  );
};
