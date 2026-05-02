import { Button } from "@/components/ui/button";
import { useFetchFlags } from "@/hooks/flagHooks/use.fetchFlag";
import { DashboardHeader } from "@/components/dashboard-comp/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard-comp/DashboardFilters";
import { EnvironmentIndicators } from "@/components/dashboard-comp/EnvironmentIndicators";
import { FlagList } from "@/components/dashboard-comp/FlagList";
import { useFlagManagement } from "@/hooks/flagHooks/useFlagManagement";
import { useFlagFilters } from "@/hooks/flagHooks/useFlagFilters";

export const Dashboard = () => {
  const { data: fetchedFlags, isLoading, error } = useFetchFlags();
  const {
    editableFlags,
    handleToggleSwitch,
    handleSaveChanges,
    isDirty,
    handleDeleteReq,
    handleEdit,
  } = useFlagManagement(fetchedFlags);

  const {
    filteredFlags,
    handleSearch,
    handleFilter,
    handleSort,
    resetFilters,
  } = useFlagFilters(editableFlags);

  if (error) return <div>Error loading flags: {error.message}</div>;

  return (
    <>
      <DashboardHeader />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-3 gap-3">
        <DashboardFilters
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onReset={resetFilters}
        />
        <EnvironmentIndicators />
      </div>

      <FlagList
        isLoading={isLoading}
        flags={filteredFlags}
        onToggleSwitch={handleToggleSwitch}
        onEdit={handleEdit}
        onDelete={handleDeleteReq}
      />

      <Button
        onClick={handleSaveChanges}
        className={isDirty ? "block m-2 float-right" : "hidden"}
      >
        Save changes
      </Button>
    </>
  );
};
