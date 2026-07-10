"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, Card, EmptyState } from "@/components/ui";

export default function VerificationPage() {
  const { baseline, subScores, healthScore, setBaselineNow, clearBaseline } = useAppData();

  const metrics = baseline
    ? [
        { label: "Asset Inventory", before: baseline.assetScore, after: subScores.asset },
        { label: "Topology", before: baseline.topologyScore, after: subScores.topology },
        { label: "Config & Backup", before: baseline.configScore, after: subScores.config },
        { label: "Standard & Change", before: baseline.standardScore, after: subScores.standard },
        { label: "Total Health Score", before: baseline.healthScore, after: healthScore },
      ]
    : [];

  return (
    <div className="space-y-5 pb-4">
      <PageHeader title="🔁 Verification" subtitle="Bandingkan skor sebelum & sesudah tindakan dilakukan." />

      {!baseline ? (
        <>
          <EmptyState icon="🔁" title="Belum ada baseline" desc="Tetapkan kondisi saat ini sebagai 'Before' sebelum mulai perbaikan." />
          <button onClick={setBaselineNow} className="w-full text-sm font-semibold bg-brand text-white rounded-xl2 py-3">
            📍 Tetapkan Skor Saat Ini sebagai Baseline
          </button>
        </>
      ) : (
        <>
          <Card className="p-4">
            <p className="text-xs text-muted mb-3">Baseline diambil: {baseline.date}</p>
            <div className="space-y-3">
              {metrics.map((m) => {
                const delta = m.after - m.before;
                return (
                  <div key={m.label} className="flex items-center justify-between text-sm">
                    <span className="text-paper font-medium">{m.label}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-muted">{m.before}</span>
                      <span className="text-muted">→</span>
                      <span className="text-paper font-semibold">{m.after}</span>
                      <span className={`font-semibold ${delta >= 0 ? "text-good" : "text-bad"}`}>
                        ({delta >= 0 ? "+" : ""}
                        {delta})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <button
            onClick={() => {
              if (confirm("Hapus baseline dan mulai ukur ulang dari kondisi saat ini?")) clearBaseline();
            }}
            className="w-full text-sm font-semibold text-bad border border-bad/30 bg-bad/10 rounded-xl2 py-3"
          >
            Reset Baseline
          </button>
        </>
      )}
    </div>
  );
}
