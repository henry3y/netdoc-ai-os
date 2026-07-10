"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, HubLink, Card } from "@/components/ui";
import { APP_CONFIG } from "@/lib/config";
import { useRef } from "react";

export default function MoreHubPage() {
  const { exportData, importData } = useAppData();
  const fileRef = useRef<HTMLInputElement>(null);

  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importData(String(reader.result));
      if (!ok) alert("File backup tidak valid.");
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-5 pb-4">
      <PageHeader title="Lainnya" subtitle="Troubleshooting, backup data, dan pengaturan." />

      <div className="space-y-3">
        <HubLink href="/more/troubleshooting" icon="🔍" title="Troubleshooting" desc="Diagnosa cepat berdasarkan gejala" />
        <HubLink href="/more/install" icon="📲" title="Cara Install ke Layar Utama" desc="Panduan install PWA di Android & iPhone" />
        <HubLink href="/more/about" icon="ℹ️" title={`Tentang ${APP_CONFIG.shortName}`} desc={`S.D.D.A.V Framework™ v${APP_CONFIG.version}`} />
      </div>

      <div>
        <p className="text-xs text-muted mb-2 uppercase tracking-wide font-semibold">Backup Data</p>
        <Card className="p-4 space-y-3">
          <p className="text-xs text-muted leading-relaxed">
            Semua data tersimpan hanya di perangkat ini (localStorage). Export berkala agar tidak hilang jika cache browser dibersihkan.
          </p>
          <button onClick={exportData} className="w-full text-sm font-semibold bg-brand text-white rounded-xl2 py-3">
            ⬇️ Export Backup (JSON)
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full text-sm font-semibold border border-line text-paper rounded-xl2 py-3"
          >
            ⬆️ Import Backup
          </button>
          <input ref={fileRef} type="file" accept="application/json" onChange={onImportFile} className="hidden" />
        </Card>
      </div>
    </div>
  );
}
