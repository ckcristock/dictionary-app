import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dictionary App",
  description: "Frontend challenge with Next.js, Tailwind and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white antialiased transition-colors`}
      >
        <ThemeProvider>
          <main className="flex flex-col items-center px-10 pt-6 pb-6 max-w-3xl mx-auto">
            {/* Aquí irá el Header con los toggles */}

            {/* Contenido principal */}
            <section className="w-full">{children}</section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
