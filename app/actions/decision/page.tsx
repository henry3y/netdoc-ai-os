"use client";
import { useAppData } from "@/lib/store";
import { DECISION_RULES } from "@/lib/data/troubleshooting";
import { PageHeader, Card } from "@/components/ui";

export default function DecisionEnginePage() {
  const { subScores, healthScore, gapCount, topDecision } = useAppData();

  const ctx = {
    assetScore: subScores.asset,
    topologyScore: subScores.topology,
    configScore: subScores.config,
    standardScore: subScores.standard,
    healthScore,
    gapCount,
  };

  return (
    <div className="space-y-5 pb-4">
      <PageHeader title="⚖️ Decision Engine" subtitle="Rule otomatis berdasarkan Sub Score & Gap terkini." />

      <Card className="p-4 border-brand/40">
        <p className="text-xs text-muted mb-1">Rekomendasi Utama</p>
        <p className="font-display font-bold text-paper text-lg leading-snug">{topDecision.recommendation}</p>
        <span className="inline-block mt-2 text-xs font-semibold text-brand bg-brand/10 rounded-full px-2.5 py-1">
          Prioritas: {topDecision.priority}
        </span>
      </Card>

      <div className="space-y-2.5">
        {DECISION_RULES.map((rule) => {
          const active = rule.isActive(ctx);
          return (
            <div key={rule.id} className="rounded-xl2 border border-line bg-surface p-4">
              <p className="text-xs text-muted mb-1">IF {rule.condition}</p>
              <p className="text-sm text-paper mb-2">{rule.recommendation}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-muted">Prioritas: {rule.priority}</span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    active ? "bg-bad/15 text-bad" : "bg-good/15 text-good"
                  }`}
                >
                  {active ? "🔴 Aktif" : "✅ Aman"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
