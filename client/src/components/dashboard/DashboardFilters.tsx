import { AppDropdown } from "@/components/DropdownComp/Dropdown";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ListFilter } from "lucide-react";
import { FILTER_OPTIONS, SORT_OPTIONS } from "@/constants/flagConstants";

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
  const handleFilterClick = (filterValue: string) => {
    if (filterValue === "") {
      onReset();
    } else {
      onFilter(filterValue);
    }
  };

  const handleSortClick = (sortValue: string) => {
    if (sortValue === "") {
      onReset();
    } else {
      onSort(sortValue);
    }
  };

  return (
    <div className="flex gap-10 items-center text-sm">
      <div className="flex gap-3">
        <AppDropdown
          triggerIcon={ListFilter}
          items={FILTER_OPTIONS.map((opt) => ({
            label: opt.label,
            onClick: () => handleFilterClick(opt.value),
          }))}
        />

        <AppDropdown
          triggerIcon={ArrowDownUp}
          items={SORT_OPTIONS.map((opt) => ({
            label: opt.label,
            onClick: () => handleSortClick(opt.value),
            separator: opt.separator,
          }))}
        />
      </div>
      <Input
        className="w-64"
        placeholder="Search flags by name"
        type="text"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
