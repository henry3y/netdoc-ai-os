"use client";
import { PageHeader, Card, SectionLabel } from "@/components/ui";
import { APP_CONFIG } from "@/lib/config";

export default function InstallGuidePage() {
  return (
    <div className="space-y-6 pb-4">
      <PageHeader title="📲 Install ke Layar Utama" subtitle={`${APP_CONFIG.shortName} berjalan seperti aplikasi biasa setelah dipasang.`} />

      <div>
        <SectionLabel>Android (Chrome)</SectionLabel>
        <Card className="p-4 space-y-3">
          {[
            "Buka link web app ini di Chrome.",
            "Tap ikon menu (⋮) di pojok kanan atas.",
            "Pilih \"Install app\" atau \"Add to Home screen\".",
            "Tap \"Install\" pada konfirmasi yang muncul.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="font-mono text-xs font-bold text-brand w-5 shrink-0">{i + 1}.</span>
              <p className="text-sm text-paper">{step}</p>
            </div>
          ))}
        </Card>
      </div>

      <div>
        <SectionLabel>iPhone (Safari)</SectionLabel>
        <Card className="p-4 space-y-3">
          {[
            "Buka link web app ini di Safari (bukan Chrome).",
            "Tap ikon Share (kotak dengan panah ke atas) di bawah layar.",
            "Scroll dan pilih \"Add to Home Screen\".",
            "Tap \"Add\" di pojok kanan atas.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="font-mono text-xs font-bold text-brand w-5 shrink-0">{i + 1}.</span>
              <p className="text-sm text-paper">{step}</p>
            </div>
          ))}
        </Card>
      </div>

      <Card className="p-4 bg-brand/5 border-brand/30">
        <p className="text-xs text-paper leading-relaxed">
          💡 Setelah terpasang, ikon <span className="font-semibold">{APP_CONFIG.shortName}</span> akan muncul di layar utama HP-mu. Buka seperti aplikasi lain — tanpa alamat bar browser, dan tetap bisa diakses meski koneksi internet terbatas.
        </p>
      </Card>
    </div>
  );
}
