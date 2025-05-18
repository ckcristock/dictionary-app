import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers/client-providers";
import FontWrapper from "./components/FontWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-y-auto">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white antialiased transition-colors overflow-y-auto`}
      >
        <ClientProviders>
          <FontWrapper>
            <main className="flex flex-col items-center p-0 md:m-0 lg:p-0">
              <section className="w-full">{children}</section>
            </main>
          </FontWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
