import PullToRefresh from "react-simple-pull-to-refresh";
import useGetPlatform from "@/hooks/useGetPlatform";

export default function RefreshPuller({ children }: { children: JSX.Element }) {
  const { platform, platformLoading } = useGetPlatform();

  const handleRefresh = async () => {
    window.location.reload();
  };

  return !platformLoading && platform === "web" ? (
    children
  ) : (
    <PullToRefresh
      pullingContent={<div></div>}
      pullDownThreshold={100}
      maxPullDownDistance={150}
      onRefresh={handleRefresh}
    >
      {children}
    </PullToRefresh>
  );
}
