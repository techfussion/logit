import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { menuItemsByRole } from "@/global/global";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Bell } from "lucide-react";
import AddSupervisorDialog from "../dialogs/AddSupervisorDialog";
import EditProfileDialog from "../dialogs/EditProfileDialog";

interface AsideProps {
  role: "STUDENT" | "INDUSTRY_SUPERVISOR" | "SCHOOL_SUPERVISOR";
}

const Aside: React.FC<AsideProps> = ({ role }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const menuItems = menuItemsByRole[role] || [];

  const notificationCount = 1;

  return (
    <Sidebar>
      <SidebarContent className="bg-white h-full flex justify-between">
        <SidebarGroup>
          <SidebarGroupContent>
            <h2 className="ml-2 mb-3 mt-6 text-xl leading-loose font-kayphodo">logit.Engine</h2>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`mb-1 ${
                    location.pathname === item.url ? "bg-gray-100" : ""
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <h3 className="ml-2 mb-3 mt-6 text-sm font-kayphodo">Quick Settings</h3>
            <SidebarMenu>
              <SidebarMenuItem>
                {role === 'STUDENT' ? (
                  <div className="ml-2">
                    <AddSupervisorDialog className="no-underline"/>
                  </div>
                  )
                  : (
                    <Button variant="link" className="w-max pl-2 text-xs text-gray-500 font-kayphodo hover:underline">Add Interns</Button>
                  )
                }
              </SidebarMenuItem>
              <SidebarMenuItem>
                <EditProfileDialog triggerButton={<Button variant="link" className="w-max pl-2 text-xs text-gray-500 font-kayphodo hover:underline">Update Profile</Button>} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex justify-between items-center">
          <Button variant="link" className="w-max mb-4 text-red-400 text-xs hover:underline" onClick={() => {
            logout();
            navigate("/")
          }}>
            Logout
          </Button>
        </div>

      </SidebarContent>
    </Sidebar>
  );
};

export default Aside;
