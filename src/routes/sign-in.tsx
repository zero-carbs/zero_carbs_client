import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <div className="">
        <div className="text-center mb-4">
          <p className="font-ital text-xl">zero_carbs</p>
        </div>
        <SignIn signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
