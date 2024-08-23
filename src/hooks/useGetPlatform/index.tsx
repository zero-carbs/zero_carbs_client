import { useState, useEffect } from "react";
import { Device } from "@capacitor/device";

/**
 * Hook to get the platform of the device.
 *
 * @returns
 *   - platform: The platform of the device, either "ios", "android", or "web".
 *   - platformLoading: Whether the platform is still loading.
 */

export default function useGetPlatform(): {
  platform: "ios" | "android" | "web";
  platformLoading: boolean;
} {
  const [platform, setPlatform] = useState<"ios" | "android" | "web">("web");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    const getPlatform = async (): Promise<string> => {
      setLoading(true);
      const info = await Device.getInfo();
      const { platform } = info;

      setPlatform(platform);
      setLoading(false);
      return platform;
    };

    getPlatform();
  }, []);

  return { platform, platformLoading: loading };
}
