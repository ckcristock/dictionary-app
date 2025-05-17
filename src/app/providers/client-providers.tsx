/* File: app/providers/client-providers.tsx */
"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import ThemeProvider from "@/app/providers/theme-provider";

export default function ClientProviders({ children }: PropsWithChildren<{}>) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
