import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.status || error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className="w-screen h-screen bg-pink-100 flex flex-col justify-center items-center gap-2">
      <p className="text-[6rem] leading-[4.4rem] duration-9000">{errorMessage}</p>
    </div>
  );
}
