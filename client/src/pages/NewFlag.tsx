import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export const NewFlag = () => {
  return (
    <Card className="p-5 m-5">
      <h1 className="font-bold">Create a feature flag</h1>
      <h3>
        A feature flag lets you controle who can see particular feature in your
        app.
      </h3>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Name</Label>
          <Input placeholder="Eg. New Update" />
          <p className="text-sm text-gray-400">
            A human-friendly name for your feature.
          </p>
        </div>
        <div className="space-y-2">
          <Label className="text-xs md:text-lg">Key</Label>
          <Input />
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
            Description{" "}
            <span className="text-xs text-gray-400">(optional)</span>
          </Label>
          <Input placeholder="Describe what this feature flag controls" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs md:text-lg">
            Tags <span className="text-xs text-gray-400">(optional)</span>
          </Label>
          <Input />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Flag variations</Label>
        <Select defaultValue="boolean">
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
        <p className="text-sm text-gray-400">
          This controls the evaluation return type of your flag in your Code.
        </p>
      </div>
      <Separator></Separator>
      <Button>Create Flag</Button>
    </Card>
  );
};
