"use client";
import { useAppData } from "@/lib/store";
import { AUDIT_CATEGORIES } from "@/lib/data/checklists";
import { PageHeader, ProgressBarMini } from "@/components/ui";
import Link from "next/link";

export default function AuditHubPage() {
  const { subScores, resetAudit } = useAppData();

  return (
    <div className="space-y-5">
      <PageHeader title="Audit Checklist" subtitle="Isi 4 kategori checklist untuk menghitung Health Score." />

      <div className="space-y-3">
        {AUDIT_CATEGORIES.map((cat) => {
          const score = subScores[cat.key];
          const answered = 0;
          return (
            <Link
              key={cat.key}
              href={`/audit/${cat.key}`}
              className="block rounded-xl2 border border-line bg-surface p-4 active:bg-surface2"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-semibold text-paper text-[15px]">
                  {cat.icon} {cat.shortTitle}
                </span>
                <span className="font-mono text-sm text-muted">{score}/100</span>
              </div>
              <ProgressBarMini value={score} />
              <p className="text-xs text-muted mt-2">{cat.items.length} pertanyaan • bobot {Math.round(cat.weight * 100)}% dari Health Score</p>
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => {
          if (confirm("Reset semua jawaban checklist ke 'Tidak'? Tindakan ini tidak bisa dibatalkan.")) {
            resetAudit();
          }
        }}
        className="w-full text-center text-sm font-semibold text-bad border border-bad/30 bg-bad/10 rounded-xl2 py-3"
      >
        🔁 Reset Semua Audit
      </button>
    </div>
  );
}
