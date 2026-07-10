"use client";
import { useAppData } from "@/lib/store";
import { AUDIT_CATEGORIES } from "@/lib/data/checklists";
import ChecklistItemCard from "@/components/ChecklistItemCard";
import { PageHeader, ProgressBarMini } from "@/components/ui";
import { AuditKey } from "@/lib/types";
import { notFound } from "next/navigation";

export default function AuditCategoryClient({ categoryKey }: { categoryKey: string }) {
  const key = categoryKey as AuditKey;
  const { answers, setAnswer, subScores } = useAppData();

  const cat = AUDIT_CATEGORIES.find((c) => c.key === key);
  if (!cat) return notFound();

  const score = subScores[key];
  const yaCount = cat.items.filter((i) => answers[key]?.[i.id] === "Ya").length;

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title={`${cat.icon} ${cat.title}`} subtitle={`${yaCount} dari ${cat.items.length} terjawab "Ya"`} />

      <div className="rounded-xl2 border border-line bg-surface p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">Sub Score</span>
          <span className="font-mono font-bold text-paper text-lg">{score}</span>
        </div>
        <ProgressBarMini value={score} />
      </div>

      <div className="space-y-3">
        {cat.items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            value={answers[key]?.[item.id] ?? "Tidak"}
            onChange={(v) => setAnswer(key, item.id, v)}
          />
        ))}
      </div>
    </div>
  );
}
