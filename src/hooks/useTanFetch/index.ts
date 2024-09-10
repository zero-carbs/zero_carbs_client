import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const LOCAL_SERVER = import.meta.env.VITE_LOCAL_SERVER;
const PUBLIC_SERVER = import.meta.env.VITE_PUBLIC_SERVER;
const isLocal = import.meta.env.MODE === "development";

export const useTanFetch = (
  key: (string | URLSearchParams)[],
  ignoreParams?: boolean,
): {
  data: any;
  isLoading: boolean;
  error: any;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { getToken } = useAuth();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const noUserPing = ["sign-in", "sign-up", "subscribe"];

  if (!key) {
    throw new Error("Invalid path");
  }
  const url = ignoreParams
    ? `${isLocal ? LOCAL_SERVER : PUBLIC_SERVER}/${key[0]}`
    : `${isLocal ? LOCAL_SERVER : PUBLIC_SERVER}/${key[0]}${searchParams.size !== 0 ? "?" : ""}${searchParams.toString()}`;

  // Fetch the user before a request and cache it for 30 seconds
  const {
    data: userData,
    isSuccess: isUserDataSuccess,
    isError: isUserDataError,
    isLoading: userIsLoading,
  } = useQuery({
    queryKey: ["user"],
    staleTime: 30 * 1000,
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        return "unauthorized";
      }

      const res = await fetch(`${isLocal ? LOCAL_SERVER : PUBLIC_SERVER}/user`, {
        headers: { Authorization: token },
      });

      if (!res.ok) {
        return false;
      }

      return res.json();
    },
    enabled: !noUserPing.includes(location.pathname),
  });

  const isSubscribed =
    isUserDataSuccess &&
    !isUserDataError &&
    userData?.data?.subscriptionStatus === "ACTIVE";

  const {
    data,
    isPending: isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: key,
    retry: 3,
    refetchIntervalInBackground: false,
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        return "unauthorized";
      }

      if (key[0] === "user" && !userIsLoading && !isSubscribed) {
        console.log('death.')
        return "unauthorized"
      }

      const res = await fetch(url, { headers: { Authorization: token } });

      if (!res.ok) {
        return false;
      }

      return res.json();
    },
  });

  return { data, isLoading, error, isError, isSuccess };
};
