import { useLogout } from "@/hooks/authHooks/use.logout";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };
  return (
    <>
      <Button className="bg-red-400 w-full" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};
