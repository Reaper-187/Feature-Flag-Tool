import { useState } from "react";
import type { FlagData } from "@/types/types";
import { filterFlagsBySearch, filterFlagsByType } from "@/utils/flagFilters";
import { sortFlags } from "@/utils/flagSorters";

export const useFlagFilters = (initialFlags: FlagData[]) => {
  const [filteredFlags, setFilteredFlags] = useState(initialFlags);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const applyFilters = (
    flags: FlagData[],
    search: string,
    filter: string,
    sort: string,
  ) => {
    let result = flags;
    result = filterFlagsBySearch(result, search);
    result = filterFlagsByType(result, filter);
    result = sortFlags(result, sort);
    setFilteredFlags(result);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    applyFilters(initialFlags, search, activeFilter, activeSort);
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    applyFilters(initialFlags, searchTerm, filter, activeSort);
  };

  const handleSort = (sort: string) => {
    setActiveSort(sort);
    applyFilters(initialFlags, searchTerm, activeFilter, sort);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setActiveFilter("");
    setActiveSort("");
    setFilteredFlags(initialFlags);
  };

  return {
    filteredFlags,
    searchTerm,
    activeFilter,
    activeSort,
    handleSearch,
    handleFilter,
    handleSort,
    resetFilters,
  };
};
