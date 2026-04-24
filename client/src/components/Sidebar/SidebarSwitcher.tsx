import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface UserInfoProps {
  userName: string;
  role: "ADMIN" | "DEV" | "GUEST";
}

export const SidebarSwitcher = ({ userName, role }: UserInfoProps) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <p>{userName.slice(0, 2).toUpperCase()}</p>
              </div>
              <div className="flex gap-2 leading-none border-b-2 border-b-indigo-500">
                <span className="font-medium">User: {userName}</span>
                <span className="font-medium">Role: {role}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
