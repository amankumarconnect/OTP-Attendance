import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button variant="destructive" onClick={logout}>
      Logout
    </Button>
  );
}
