"use client";
import { useAppData } from "@/lib/store";
import { AUDIT_CATEGORIES } from "@/lib/data/checklists";
import ScoreGauge from "@/components/ScoreGauge";
import { Card, SectionLabel, ProgressBarMini, PageHeader } from "@/components/ui";
import Link from "next/link";

const CAT_COLOR: Record<string, string> = {
  asset: "#7C5CFF",
  topology: "#22C55E",
  config: "#F5A623",
  standard: "#F59E0B",
};

export default function DashboardPage() {
  const { healthScore, grade, subScores, gapCount, topDecision, hydrated, progress } = useAppData();

  const today = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  const trend = progress.slice(-6);

  if (!hydrated) {
    return <div className="pt-20 text-center text-muted text-sm">Memuat data…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted font-mono">{today}</p>
        <PageHeader title="Health Score Dashboard" subtitle="Kondisi dokumentasi jaringan Anda saat ini." />
      </div>

      <Card className="p-6 flex flex-col items-center">
        <ScoreGauge score={healthScore} grade={grade} size={188} />
        {gapCount > 0 && (
          <Link
            href="/data/gap-detection"
            className="mt-4 text-xs font-semibold text-bad bg-bad/10 border border-bad/30 rounded-full px-3 py-1.5"
          >
            ⚠️ {gapCount} gap dokumentasi aktif — lihat detail
          </Link>
        )}
      </Card>

      <div>
        <SectionLabel>Sub Score per Kategori</SectionLabel>
        <Card className="p-4 space-y-4">
          {AUDIT_CATEGORIES.map((cat) => (
            <Link key={cat.key} href={`/audit/${cat.key}`} className="block">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-paper font-medium">
                  {cat.icon} {cat.shortTitle}
                </span>
                <span className="font-mono text-muted">{subScores[cat.key]}</span>
              </div>
              <ProgressBarMini value={subScores[cat.key]} color={CAT_COLOR[cat.key]} />
            </Link>
          ))}
        </Card>
      </div>

      <div>
        <SectionLabel>Prioritas Tindakan</SectionLabel>
        <Link href="/actions/decision">
          <Card className="p-4 border-brand/30">
            <p className="text-xs text-muted mb-1">Rekomendasi utama saat ini</p>
            <p className="text-paper font-display font-semibold text-[15px] leading-snug">
              {topDecision.recommendation}
            </p>
            <span className="inline-block mt-2 text-[11px] font-semibold text-brand bg-brand/10 rounded-full px-2 py-0.5">
              Prioritas: {topDecision.priority}
            </span>
          </Card>
        </Link>
      </div>

      {trend.length > 1 && (
        <div>
          <SectionLabel>Trend Health Score</SectionLabel>
          <Card className="p-4">
            <TrendSparkline values={trend.map((t) => t.healthScore)} />
          </Card>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link href="/actions/ai-diagnosis">
          <Card className="p-4 text-center active:bg-surface2">
            <span className="text-2xl">🤖</span>
            <p className="text-xs font-semibold text-paper mt-1.5">AI Diagnosis</p>
          </Card>
        </Link>
        <Link href="/actions/plan">
          <Card className="p-4 text-center active:bg-surface2">
            <span className="text-2xl">🛠</span>
            <p className="text-xs font-semibold text-paper mt-1.5">Action Plan</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}

function TrendSparkline({ values }: { values: number[] }) {
  const w = 280;
  const h = 60;
  const max = 100;
  const min = 0;
  const stepX = w / Math.max(1, values.length - 1);
  const points = values
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16">
      <polyline points={points} fill="none" stroke="#7C5CFF" strokeWidth="2.5" className="signal-trace" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => {
        const x = i * stepX;
        const y = h - ((v - min) / (max - min)) * h;
        return <circle key={i} cx={x} cy={y} r={3} fill="#7C5CFF" />;
      })}
    </svg>
  );
}
