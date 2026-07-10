"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, Card, SectionLabel } from "@/components/ui";
import { useMemo, useState } from "react";

const EXTRA_PROMPTS = [
  {
    name: "Analisis Score",
    text: "Berikut hasil score audit dokumentasi saya: Asset Inventory {X}, Topology {Y}, Config & Backup {Z}, Standard & Change {T}. Jelaskan apa arti masing-masing score ini dan mana yang paling perlu diperbaiki.",
  },
  {
    name: "Analisis Root Cause Gap",
    text: "Berikut daftar gap dokumentasi yang terdeteksi [paste data gap], jelaskan kemungkinan risikonya dan urutan langkah penyelesaian yang paling aman.",
  },
  {
    name: "Rencana Update Topologi",
    text: "Berikut kondisi topologi jaringan saya saat ini [paste data topology], berikan rekomendasi bagian mana yang perlu didiagram ulang atau diperbarui.",
  },
  {
    name: "Laporan Manajemen",
    text: "Buatkan ringkasan eksekutif (3-5 kalimat) dari hasil audit dokumentasi jaringan ini untuk dilaporkan ke [manajemen/atasan IT], fokus pada risiko gap dokumentasi dan rencana perbaikan.",
  },
];

export default function AiDiagnosisPage() {
  const { subScores, healthScore, grade, gaps, gapCount } = useAppData();
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    return `Anda adalah AI Network Documentation Diagnostic Expert.

Berikut data audit dokumentasi jaringan pengguna:

ASSET INVENTORY SCORE: ${subScores.asset}
TOPOLOGY SCORE: ${subScores.topology}
CONFIG & BACKUP SCORE: ${subScores.config}
STANDARD & CHANGE SCORE: ${subScores.standard}
GAP DOKUMENTASI AKTIF: ${gapCount}${gaps.length ? " (" + gaps.slice(0, 5).map((g) => `${g.deviceName || "?"}: ${g.gapType}`).join("; ") + ")" : ""}
TOTAL HEALTH SCORE: ${healthScore} (${grade})

Tugas Anda:
1. Baca seluruh data score dan gap di atas.
2. Tentukan akar masalah utama (root cause) kelemahan dokumentasi jaringan, urutkan dari paling berdampak.
3. Kelompokkan masalah ke dalam kategori: Asset Inventory, Topology, Configuration/Backup, Standard/Change Management.
4. Berikan penjelasan sederhana yang bisa dipahami tim non-networking.
5. Berikan prioritas tindakan (1, 2, 3).
6. Berikan rekomendasi konkret untuk tiap prioritas.
7. Berikan estimasi dampak perbaikan (dalam % peningkatan score) dan estimasi risiko downtime/handover.

Format output: Ringkasan, Root Cause, Priority, Recommendation, Next Step.`;
  }, [subScores, healthScore, grade, gaps, gapCount]);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="space-y-5 pb-4">
      <PageHeader title="🤖 AI Diagnosis Prompt" subtitle="Otomatis terisi dari data audit Anda saat ini." />

      <Card className="p-4">
        <pre className="whitespace-pre-wrap text-xs font-mono text-paper leading-relaxed">{prompt}</pre>
        <button
          onClick={() => copy(prompt)}
          className="w-full mt-4 text-sm font-semibold bg-brand text-white rounded-xl2 py-3"
        >
          {copied ? "✅ Tersalin!" : "📋 Salin Prompt"}
        </button>
      </Card>

      <div>
        <SectionLabel>Prompt Tambahan</SectionLabel>
        <div className="space-y-2.5">
          {EXTRA_PROMPTS.map((p) => (
            <Card key={p.name} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-display font-semibold text-sm text-paper">{p.name}</p>
                <button onClick={() => copy(p.text)} className="text-xs font-semibold text-brand">
                  Salin
                </button>
              </div>
              <p className="text-xs text-muted leading-relaxed">{p.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
