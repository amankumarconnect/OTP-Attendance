import { SignupForm } from "@/components/signup-form";

export function FacultySignup() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm role="faculty" />
      </div>
    </div>
  );
}
