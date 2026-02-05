import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/context/AuthContext";

export function Home() {
  const { user } = useAuth();
  return (
    <div className="flex w-full justify-center min-h-svh items-center">
      {user ? <LoggedIn user={user} /> : <LoggedOut />}
    </div>
  );
}

function LoggedIn({ user }: { user: User }) {
  return <div>Welcome {user.name}</div>;
}

function LoggedOut() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Link to="/signup/faculty">
          <Button>Signup as Faculty</Button>
        </Link>
        <Link to="/signup/student">
          <Button>Signup as Student</Button>
        </Link>
      </div>
      <p className="text-center font-bold">OR</p>
      <Link to="/login">
        <Button className="w-full">Login</Button>
      </Link>
    </div>
  );
}
