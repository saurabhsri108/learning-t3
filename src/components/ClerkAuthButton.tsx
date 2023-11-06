import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function ClerkAuthButton() {
  const user = useUser();
  if (!user.isSignedIn) {
    return (
      <SignInButton>
        <button className="border border-transparent bg-slate-800 px-4 py-4 font-medium text-slate-50 hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950 focus:bg-slate-50 focus:text-slate-950 active:border-slate-950 active:bg-slate-50 active:text-slate-950">
          Sign in with clerk
        </button>
      </SignInButton>
    );
  }
  if (user.isSignedIn) {
    return (
      <SignOutButton>
        <button className="border border-transparent bg-slate-800 px-4 py-4 font-medium text-slate-50 hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950 focus:bg-slate-50 focus:text-slate-950 active:border-slate-950 active:bg-slate-50 active:text-slate-950">
          Logout
        </button>
      </SignOutButton>
    );
  }
}
