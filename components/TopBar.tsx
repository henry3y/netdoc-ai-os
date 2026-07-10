"use client";
import { useAppData } from "@/lib/store";
import { GRADE_META } from "@/lib/scoring";
import { APP_CONFIG } from "@/lib/config";
import Link from "next/link";

export default function TopBar() {
  const { healthScore, grade } = useAppData();
  const meta = GRADE_META[grade];
  const [firstWord, ...rest] = APP_CONFIG.shortName.split(" ");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur safe-top">
      <div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(124,92,255,0.7)]" />
          <span className="font-display font-bold text-[15px] tracking-tight text-paper">
            {firstWord} <span className="text-brand">{rest.join(" ")}</span>
          </span>
        </Link>
        <Link
          href="/actions/decision"
          className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.color}`}
        >
          {meta.emoji} {healthScore}
        </Link>
      </div>
    </header>
  );
}
