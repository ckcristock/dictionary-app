// src/app/providers/client-providers.tsx
"use client";

import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import ThemeProvider from "@/app/providers/theme-provider";
import { useAppDispatch } from "@/app/hooks/redux";
import { setTheme } from "@/app/store/themeSlice";

function InitTheme() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    dispatch(setTheme(prefersDark ? "dark" : "light"));
  }, [dispatch]);

  return null;
}

export default function ClientProviders({ children }: PropsWithChildren<{}>) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <InitTheme />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
