import { Button } from "@/components/ui/button";
import { useFetchFlags } from "@/hooks/flagHooks/use.fetchFlag";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { EnvironmentIndicators } from "@/components/dashboard/EnvironmentIndicators";
import { FlagList } from "@/components/dashboard/FlagList";
import { useFlagManagement } from "@/hooks/flagHooks/useFlagManagement";
import { useFlagFilters } from "@/hooks/flagHooks/useFlagFilters";

export const Dashboard = () => {
  const { data: fetchedFlags, isLoading, error } = useFetchFlags();
  const {
    serverFlags,
    editableFlags,
    handleToggleSwitch,
    handleSaveChanges,
    isDirty,
    handleDeleteReq,
    handleEdit,
  } = useFlagManagement(fetchedFlags);

  const { handleSearch, handleFilter, handleSort, resetFilters } =
    useFlagFilters(serverFlags);

  if (isLoading) return <div>Loading flags...</div>;
  if (error) return <div>Error loading flags: {error.message}</div>;

  return (
    <>
      <DashboardHeader />

      <div className="flex justify-between px-3">
        <DashboardFilters
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onReset={resetFilters}
        />
        <EnvironmentIndicators />
      </div>

      <FlagList
        flags={editableFlags}
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
