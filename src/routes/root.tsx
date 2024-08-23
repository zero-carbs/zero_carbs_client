import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import ChartPage from "./charts";
import { SignedIn, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import ProgressBar from "@/components/ProgressBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Toaster } from "@/components/ui/toaster";
import { useTanFetch } from "@/hooks/useTanFetch";

const isLocal = import.meta.env.MODE === "development";
const CLERK_KEY = isLocal
  ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY_DEV
  : import.meta.env.VITE_CLERK_PUBLISHABLE_KEY_PROD;

if (!CLERK_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function Root() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("mobile");
  const theme = localStorage.getItem("vite-ui-theme");

  const { data: userData, isLoading: userDataLoading } = useTanFetch(
    ["user"],
    true,
  );

  const isSubscribed =
    !userDataLoading &&
    isLoaded &&
    ((userId && userData.data?.subscriptionStatus === "ACTIVE") ||
      location.state?.isSubscribed);

  const loggedOut = userData === "unauthorized";

  useEffect(() => {
    if (isLoaded && loggedOut) {
      navigate("/sign-in");
    }

    if (isLoaded && loggedOut && location.pathname.includes("sign-up")) {
      navigate("/sign-up");
    }

    if (isLoaded && !userDataLoading && userId && !isSubscribed) {
      navigate("/subscribe");
    }

    if (
      isLoaded &&
      !userDataLoading &&
      userId &&
      isSubscribed &&
      location.pathname.includes("/subscribe")
    ) {
      navigate("/");
    }
  }, [userId, isSubscribed, isLoaded, userData]);

  if (!isLoaded || userDataLoading) {
    return <ProgressBar />;
  }

  const fullWidthPages = ["sign-in", "sign-up", "subscribe"];
  const isFw = fullWidthPages.includes(location.pathname.split("/")[1]);

  return (
    <>
      <div
        className={`${theme} !font-dank ${userId && isSubscribed ? "grid grid-cols-1 md:grid-cols-8 h-screen" : "h-full w-full grid grid-cols-1"} ${!isFw && "max-w-[1400px]"} mx-auto text-primary-foreground`}
      >
        {isSubscribed && (
          <SignedIn>
            <NavBar />
          </SignedIn>
        )}

        <div className={`col-span-1 md:col-span-7 ${isMobile && "pb-16"}`}>
          {location.pathname === "/" ? <ChartPage /> : <Outlet />}
        </div>
        <Toaster />
      </div>
    </>
  );
}
