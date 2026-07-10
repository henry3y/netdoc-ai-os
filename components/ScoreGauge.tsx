"use client";
import { Grade } from "@/lib/types";
import { GRADE_META } from "@/lib/scoring";

const GRADE_STROKE: Record<Grade, string> = {
  Excellent: "#22C55E",
  Good: "#F59E0B",
  Fair: "#F5A623",
  Critical: "#EF4444",
};

export default function ScoreGauge({
  score,
  grade,
  size = 176,
  label = "Health Score",
}: {
  score: number;
  grade: Grade;
  size?: number;
  label?: string;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const dash = circumference * pct;
  const color = GRADE_STROKE[grade];
  const meta = GRADE_META[grade];

  // angle of the arc end, for the pulse dot position (-90deg start)
  const angle = -90 + pct * 360;
  const rad = (angle * Math.PI) / 180;
  const dotX = cx + r * Math.cos(rad);
  const dotY = cy + r * Math.sin(rad);

  return (
    <div className="relative inline-flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} stroke="#25323F" strokeWidth={stroke} fill="none" />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.4s ease" }}
        />
      </svg>
      {/* pulse dot at arc tip */}
      {score > 0 && (
        <span
          className="absolute rounded-full animate-blink"
          style={{
            width: 8,
            height: 8,
            left: dotX - 4,
            top: dotY - 4,
            background: color,
            boxShadow: `0 0 10px 2px ${color}`,
          }}
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold tabular-nums" style={{ fontSize: size * 0.26, color: "#E7EDF3" }}>
          {score}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-muted mt-0.5">{label}</span>
        <span className={`mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
          {meta.emoji} {meta.label}
        </span>
      </div>
    </div>
  );
}
