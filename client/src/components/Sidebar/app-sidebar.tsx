import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarSwitcher } from "./SidebarSwitcher";
import { useAuth } from "@/hooks/authHooks/use.auth";
import { LogoutButton } from "../Logout/LogoutButton";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar() {
  const { data, isLoading } = useAuth();

  if (!data?.name && !data?.role) {
    return null;
  }

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/generall/settings", label: "Settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarSwitcher
          userName={data?.name}
          role={data?.role}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="flex self-center text-sm gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          <p className="flex self-center text-sm gap-2">
            <span className="font-semibold">email:</span> {data?.email}
          </p>
        )}
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Generall</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                <>
                  {[1, 2].map((i) => (
                    <SidebarMenuItem key={i}>
                      <div className="flex justify-start items-center gap-3 px-4 py-2.5 m-1 w-full">
                        <Skeleton className="h-5 w-24" />
                      </div>
                    </SidebarMenuItem>
                  ))}
                </>
              ) : (
                menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <Link to={item.path}>
                      <SidebarMenuButton
                        className={`
                          flex justify-start items-center gap-3 px-4 py-2.5 m-1 w-full 
                          rounded-md border-2 border-transparent 
                          hover:border-primary hover:bg-accent hover:text-accent-foreground
                          transition-all duration-200 ease-in-out`}
                      >
                        {item.label}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-2">
        <LogoutButton />
      </div>
    </Sidebar>
  );
}
