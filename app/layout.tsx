import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppDataProvider } from "@/lib/store";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import InstallPrompt from "@/components/InstallPrompt";
import RegisterSW from "@/components/RegisterSW";
import { APP_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} — Network Documentation`,
  description: APP_CONFIG.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_CONFIG.shortName,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: APP_CONFIG.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-ink">
        <AppDataProvider>
          <TopBar />
          <main className="mx-auto max-w-md px-4 pt-5 pb-28 min-h-[calc(100vh-56px)]">{children}</main>
          <BottomNav />
          <InstallPrompt />
        </AppDataProvider>
        <RegisterSW />
      </body>
    </html>
  );
}
