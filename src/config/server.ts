const LOCAL_SERVER = import.meta.env.VITE_LOCAL_SERVER;
const PUBLIC_SERVER = import.meta.env.VITE_PUBLIC_SERVER;
const isLocal = import.meta.env.MODE === "development";

export const server = isLocal ? LOCAL_SERVER : PUBLIC_SERVER;
