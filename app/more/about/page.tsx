"use client";
import { PageHeader, Card, SectionLabel } from "@/components/ui";
import { APP_CONFIG } from "@/lib/config";

const STAGES = [
  { letter: "S", name: "Score", desc: "Mengukur kondisi secara objektif menggunakan checklist dan scoring." },
  { letter: "D", name: "Diagnose", desc: "Menganalisis akar penyebab berdasarkan hasil audit dan score." },
  { letter: "D", name: "Decide", desc: "Menentukan prioritas tindakan berdasarkan dampak terbesar." },
  { letter: "A", name: "Act", desc: "Menyusun Action Plan yang mudah dijalankan." },
  { letter: "V", name: "Verify", desc: "Melakukan audit ulang untuk mengukur peningkatan." },
];

export default function AboutPage() {
  return (
    <div className="space-y-6 pb-4">
      <PageHeader title="ℹ️ Tentang" subtitle={`${APP_CONFIG.name} v${APP_CONFIG.version} — dibangun dengan S.D.D.A.V Framework™`} />

      <div>
        <SectionLabel>S.D.D.A.V Framework™</SectionLabel>
        <div className="space-y-2.5">
          {STAGES.map((s) => (
            <Card key={s.name} className="p-4 flex items-start gap-3">
              <span className="font-display font-bold text-2xl text-brand w-8 shrink-0">{s.letter}</span>
              <div>
                <p className="font-display font-semibold text-paper text-sm">{s.name}</p>
                <p className="text-xs text-muted mt-0.5">{s.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-4 space-y-2 text-xs text-muted leading-relaxed">
        <p>
          <span className="text-paper font-semibold">{APP_CONFIG.name}</span> membantu tim IT mencatat, memetakan, mengaudit, dan memperbarui seluruh aset serta konfigurasi jaringan dalam satu tempat — tanpa file Excel/Visio yang tercecer.
        </p>
        <p>Semua data tersimpan lokal di perangkat Anda. Tidak ada data yang dikirim ke server manapun.</p>
        <p className="font-mono pt-2 text-[11px]">Versi {APP_CONFIG.version} — Next.js PWA Edition</p>
      </Card>
    </div>
  );
}
