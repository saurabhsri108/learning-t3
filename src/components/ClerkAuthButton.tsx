import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function ClerkAuthButton() {
  const user = useUser();
  if (!user.isLoaded) {
    return (
      <button className="h-14 w-24 animate-pulse border border-transparent bg-slate-800 px-4 py-4 font-medium text-slate-50 hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950 focus:bg-slate-50 focus:text-slate-950 active:border-slate-950 active:bg-slate-50 active:text-slate-950"></button>
    );
  } else {
    if (!user.isSignedIn) {
      return (
        <SignInButton>
          <button className="h-14 w-24 border border-transparent bg-slate-800 font-medium text-slate-50 hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950 focus:bg-slate-50 focus:text-slate-950 active:border-slate-950 active:bg-slate-50 active:text-slate-950">
            Login
          </button>
        </SignInButton>
      );
    }
    if (user.isSignedIn) {
      return (
        <SignOutButton>
          <button className="h-14 w-24 border border-transparent bg-slate-800 font-medium text-slate-50 hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950 focus:bg-slate-50 focus:text-slate-950 active:border-slate-950 active:bg-slate-50 active:text-slate-950">
            Logout
          </button>
        </SignOutButton>
      );
    }
  }
}
