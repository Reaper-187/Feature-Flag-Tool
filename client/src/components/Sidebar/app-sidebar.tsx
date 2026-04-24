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

export function AppSidebar() {
  const { data } = useAuth();

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
        <SidebarSwitcher userName={data?.name} role={data?.role} />

        <p className="flex self-center text-sm gap-2">
          <span className="font-semibold">email:</span> {data.email}
        </p>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Generall</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
              ))}
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
