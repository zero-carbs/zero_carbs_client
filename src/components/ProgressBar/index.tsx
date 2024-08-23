import { useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState<number>(0);

  setInterval(() => {
    setProgress((prev) => (prev += 1));
  }, 200);

  return (
    <div className="w-full h-1">
      <div
        className="h-1 bg-flamingo transition-all ease-in-out"
        style={{ width: `${String(progress)}%`, maxWidth: "100vw" }}
      ></div>
    </div>
  );
}
