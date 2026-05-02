import { AppDropdown } from "@/components/DropdownComp/Dropdown";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ListFilter } from "lucide-react";
import { FILTER_OPTIONS, SORT_OPTIONS } from "@/constants/flagConstants";
import { CreateFlag } from "../Button/createFlag";

interface DashboardFiltersProps {
  onSearch: (term: string) => void;
  onFilter: (filter: string) => void;
  onSort: (sort: string) => void;
  onReset: () => void;
}

export const DashboardFilters = ({
  onSearch,
  onFilter,
  onSort,
  onReset,
}: DashboardFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-start sm:items-center text-sm">
      <div className="flex gap-3">
        <AppDropdown
          triggerIcon={ListFilter}
          items={[
            ...FILTER_OPTIONS.map((opt) => ({
              label: opt.label,
              onClick: () => onFilter(opt.value),
            })),
            {
              label: "Clear Filter",
              onClick: onReset,
              separator: true,
            },
          ]}
        />

        <AppDropdown
          triggerIcon={ArrowDownUp}
          items={[
            ...SORT_OPTIONS.map((opt) => ({
              label: opt.label,
              onClick: () => onSort(opt.value),
              separator: opt.separator,
            })),
            {
              label: "Clear Sort",
              onClick: onReset,
              separator: true,
            },
          ]}
        />
        <div className="block md:hidden">
          <CreateFlag />
        </div>
      </div>

      <Input
        className="w-full sm:w-64"
        placeholder="Search flags by name"
        type="text"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
