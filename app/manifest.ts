import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${APP_CONFIG.name} — Network Documentation`,
    short_name: APP_CONFIG.shortName,
    description: APP_CONFIG.description,
    start_url: ".",
    scope: ".",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: APP_CONFIG.themeColor,
    theme_color: APP_CONFIG.themeColor,
    lang: "id",
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "icons/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
