// components/ui/AppDropdown.tsx
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  className?: string;
  separator?: boolean;
}

interface AppDropdownProps {
  triggerIcon: LucideIcon;
  triggerClassName?: string;
  items: DropdownItem[];
  align?: "start" | "end" | "center";
}

export const AppDropdown = ({
  triggerIcon: Icon,
  triggerClassName = "text-xs w-fit",
  items,
  align = "start",
}: AppDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={triggerClassName} variant="outline">
          <Icon color="black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <DropdownMenuItem
                onClick={item.onClick}
                className={`transition duration-300 ${item.className || ""}`}
              >
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.label}
              </DropdownMenuItem>
              {item.separator && index < items.length - 1 && (
                <DropdownMenuSeparator />
              )}
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
