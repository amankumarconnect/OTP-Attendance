import { Button } from "@/components/ui/button";

export function Home() {
  if (false) return <LoggedIn />;
  return <LoggedOut />;
}

function LoggedIn() {
  return <div>Welcome dear</div>;
}

function LoggedOut() {
  return (
    <div>
      <Button>SignUp</Button>
      <Button>Login</Button>
    </div>
  );
}
