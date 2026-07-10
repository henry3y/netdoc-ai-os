"use client";
import { ChecklistItem as ChecklistItemType, Answer } from "@/lib/types";
import { useState } from "react";

export default function ChecklistItemCard({
  item,
  value,
  onChange,
}: {
  item: ChecklistItemType;
  value: Answer;
  onChange: (v: Answer) => void;
}) {
  const [showTips, setShowTips] = useState(false);
  const isYa = value === "Ya";

  return (
    <div className="rounded-xl2 border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[14px] leading-snug text-paper flex-1">{item.question}</p>
        <span className="font-mono text-[11px] text-muted shrink-0 mt-0.5">w{item.weight}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => onChange("Ya")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            isYa ? "bg-good/20 text-good border border-good/40" : "bg-surface2 text-muted border border-line"
          }`}
        >
          Ya
        </button>
        <button
          onClick={() => onChange("Tidak")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            !isYa ? "bg-bad/20 text-bad border border-bad/40" : "bg-surface2 text-muted border border-line"
          }`}
        >
          Tidak
        </button>
        <button
          onClick={() => setShowTips((s) => !s)}
          aria-label="Lihat alasan & tips"
          className="w-9 h-9 shrink-0 rounded-lg border border-line text-muted flex items-center justify-center"
        >
          {showTips ? "▲" : "?"}
        </button>
      </div>

      {showTips && (
        <div className="mt-3 pt-3 border-t border-line text-xs text-muted space-y-1.5">
          <p>
            <span className="text-paper font-semibold">Kenapa penting: </span>
            {item.reason}
          </p>
          <p>
            <span className="text-paper font-semibold">Tips: </span>
            {item.tips}
          </p>
        </div>
      )}
    </div>
  );
}
