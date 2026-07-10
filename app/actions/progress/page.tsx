"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, Card, EmptyState } from "@/components/ui";

export default function ProgressTrackerPage() {
  const { progress, saveSnapshotToProgress } = useAppData();
  const sorted = [...progress].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="📈 Progress Tracker" subtitle="Histori setiap audit tersimpan di sini." />

      <button
        onClick={() => saveSnapshotToProgress()}
        className="w-full text-sm font-semibold bg-brand text-white rounded-xl2 py-3"
      >
        💾 Simpan Snapshot Hari Ini
      </button>

      {sorted.length === 0 ? (
        <EmptyState icon="📈" title="Belum ada histori" desc="Simpan snapshot pertama Anda." />
      ) : (
        <div className="space-y-2.5">
          {sorted.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs text-muted">{p.date}</span>
                <span className="font-mono font-bold text-lg text-paper">{p.healthScore}</span>
              </div>
              <p className="text-xs text-muted mb-1">Sub Score (A/T/C/S): {p.subScores}</p>
              <p className="text-sm text-paper">{p.mainIssue}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted">{p.actionTaken}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    p.status === "Selesai" ? "bg-good/15 text-good" : p.status === "Berjalan" ? "bg-brand/15 text-brand" : "bg-warn/15 text-warn"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
