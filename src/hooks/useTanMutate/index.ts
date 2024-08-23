import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const LOCAL_SERVER = import.meta.env.VITE_LOCAL_SERVER;
const PUBLIC_SERVER = import.meta.env.VITE_PUBLIC_SERVER;
const isLocal = import.meta.env.MODE === "development";

export default function useTanMutate({
  key,
  method,
  ignoreParams,
  reval,
  retry,
}: {
  key: string;
  method?: string;
  ignoreParams?: boolean;
  reval?: string[];
  retry?: number;
}) {
  const { getToken } = useAuth();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const postRequest = async (params: any, { arg }: { arg: any }) => {
    const [url, headers] = params;

    return fetch(url, {
      ...headers,
      method: method?.toUpperCase() || "POST",
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  };

  const url = ignoreParams
    ? `${isLocal ? LOCAL_SERVER : PUBLIC_SERVER}/${key}`
    : `${isLocal ? LOCAL_SERVER : PUBLIC_SERVER}/${key}${searchParams.size !== 0 ? "?" : ""}${searchParams.toString()}`;

  const mutation = useMutation({
    retry,
    mutationFn: async (fff: any) => {
      const token = await getToken();

      if (!token) {
        return false;
      }

      return postRequest([url, { headers: { Authorization: token } }], {
        arg: fff,
      });
    },
    onSuccess: () => {
      reval &&
        reval.map((key: string) =>
          reval.includes("all")
            ? queryClient.invalidateQueries()
            : queryClient.invalidateQueries({ queryKey: [key] }),
        );
    },
    onError: (error, vars, context) => {
      // console.log("onError context:", context);
      // console.log("onError error:", error);
      // console.log("onError vars:", vars);
      return { error, vars, context };
    },
  });

  return mutation;
}
