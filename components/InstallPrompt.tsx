"use client";
import { useEffect, useState } from "react";
import { APP_CONFIG } from "@/lib/config";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isIos() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const [dismissedBefore, setDismissedBefore] = useState(true);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("netdoc_install_dismissed");
    setDismissedBefore(dismissed === "1");

    if (isStandalone()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!dismissed) setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (isIos() && !dismissed) {
      setShowIosHint(true);
      setVisible(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible || dismissedBefore) return null;

  const dismiss = () => {
    window.localStorage.setItem("netdoc_install_dismissed", "1");
    setVisible(false);
  };

  const install = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    dismiss();
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 px-4 pb-2">
      <div className="mx-auto max-w-md rounded-xl2 border border-brand/40 bg-surface2 shadow-glow p-4 flex items-start gap-3">
        <span className="text-2xl">📲</span>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-paper text-sm">Install {APP_CONFIG.shortName}</p>
          {showIosHint ? (
            <p className="text-xs text-muted mt-1">
              Tap tombol <span className="font-semibold text-paper">Share</span> di Safari, lalu pilih{" "}
              <span className="font-semibold text-paper">&quot;Add to Home Screen&quot;</span>.
            </p>
          ) : (
            <p className="text-xs text-muted mt-1">
              Pasang di layar utama HP-mu untuk akses sekali sentuh, seperti aplikasi biasa.
            </p>
          )}
          <div className="flex gap-2 mt-3">
            {!showIosHint && (
              <button
                onClick={install}
                className="text-xs font-semibold bg-brand text-white px-3 py-1.5 rounded-lg"
              >
                Install
              </button>
            )}
            <button
              onClick={dismiss}
              className="text-xs font-semibold text-muted px-3 py-1.5 rounded-lg border border-line"
            >
              Nanti saja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
