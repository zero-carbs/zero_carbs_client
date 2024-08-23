import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <div className="">
        <div className="text-center mb-4 font-ital">
          <p>zero_carbs</p>
        </div>
        <SignUp signInUrl="/sign-in" afterSignUpUrl="/" />
      </div>
    </div>
  );
}
