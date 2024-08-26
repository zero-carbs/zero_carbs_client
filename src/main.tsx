import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page.tsx";
import SignInPage from "./routes/sign-in.tsx";
import UserSettingsPage from "./routes/user-settings.tsx";
import SearchPage from "./routes/search.tsx";
import SignUpPage from "./routes/sign-up.tsx";
import SiteSettingsPage from "./routes/settings.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { clerkStyles } from "./config/clerkStyles.ts";
import RefreshPuller from "./components/native/RefreshPuller/index.tsx";
import { ThemeProvider } from "./components/themeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SubscribePage from "./routes/subscribe.tsx";
import * as Sentry from "@sentry/react";

const ListingsPage = lazy(() => import("./routes/listings.tsx"));
const PurchasesPage = lazy(() => import("./routes/purchases.tsx"));
const ItemsPage = lazy(() => import("./routes/items.tsx"));

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  tracePropagationTargets: ["localhost", "https://app.zerocarbs.app"],
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const isLocal = import.meta.env.MODE === "development";
const CLERK_KEY = isLocal
  ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY_DEV
  : import.meta.env.VITE_CLERK_PUBLISHABLE_KEY_PROD;

if (!CLERK_KEY) {
  throw new Error("No Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/purchases",
        element: (
          <Suspense>
            <PurchasesPage />
          </Suspense>
        ),
      },
      {
        path: "/listings",
        element: (
          <Suspense>
            <ListingsPage />
          </Suspense>
        ),
      },
      {
        path: "/items",
        element: (
          <Suspense>
            <ItemsPage />
          </Suspense>
        ),
      },
      {
        path: "/subscribe",
        element: <SubscribePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/user-settings",
        element: <UserSettingsPage />,
      },
      {
        path: "/settings",
        element: <SiteSettingsPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={CLERK_KEY} appearance={clerkStyles}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RefreshPuller>
          <RouterProvider router={router} />
        </RefreshPuller>
      </ThemeProvider>
    </ClerkProvider>
  </QueryClientProvider>,
  // {/* </React.StrictMode>, */}
);
