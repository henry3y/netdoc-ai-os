"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, Card } from "@/components/ui";
import { ActionItem } from "@/lib/types";

const STAGES: ActionItem["tahap"][] = ["Hari Ini", "3 Hari", "7 Hari", "30 Hari"];
const PRIORITY_COLOR: Record<ActionItem["prioritas"], string> = {
  "Sangat Tinggi": "text-bad bg-bad/15",
  Tinggi: "text-warn bg-warn/15",
  Sedang: "text-fair bg-fair/15",
  Rendah: "text-muted bg-surface2",
};
const STATUS_COLOR: Record<ActionItem["status"], string> = {
  Pending: "text-warn bg-warn/15",
  Berjalan: "text-brand bg-brand/15",
  Selesai: "text-good bg-good/15",
};

export default function ActionPlanPage() {
  const { actionPlan, setActionPlan } = useAppData();

  const cycleStatus = (id: string) => {
    const order: ActionItem["status"][] = ["Pending", "Berjalan", "Selesai"];
    setActionPlan((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const next = order[(order.indexOf(a.status) + 1) % order.length];
        return { ...a, status: next };
      })
    );
  };

  return (
    <div className="space-y-6 pb-4">
      <PageHeader title="🛠 Action Plan" subtitle="Tap status untuk mengubah: Pending → Berjalan → Selesai." />

      {STAGES.map((stage) => {
        const items = actionPlan.filter((a) => a.tahap === stage);
        if (items.length === 0) return null;
        return (
          <div key={stage}>
            <h3 className="font-display text-sm font-bold text-paper mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" /> {stage}
            </h3>
            <div className="space-y-2.5">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <p className="text-sm text-paper leading-snug mb-2.5">{item.langkah}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_COLOR[item.prioritas]}`}>
                      {item.prioritas}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface2 text-muted">
                      ⏱ {item.estimasi}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface2 text-muted">
                      {item.kesulitan}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface2 text-muted">
                      {item.biaya}
                    </span>
                  </div>
                  <button
                    onClick={() => cycleStatus(item.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${STATUS_COLOR[item.status]}`}
                  >
                    {item.status === "Pending" ? "⏳" : item.status === "Berjalan" ? "🔄" : "✅"} {item.status}
                  </button>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
