import Link from "next/link";
import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl2 border border-line bg-surface shadow-card ${className}`}>{children}</div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-3">
      {children}
    </h2>
  );
}

export function GradeBadge({ emoji, label, className = "" }: { emoji: string; label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
}

export function ProgressBarMini({ value, color = "#7C5CFF" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-surface2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }}
      />
    </div>
  );
}

export function HubLink({
  href,
  icon,
  title,
  desc,
  right,
}: {
  href: string;
  icon: string;
  title: string;
  desc: string;
  right?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl2 border border-line bg-surface p-4 active:bg-surface2 transition-colors"
    >
      <span className="text-2xl leading-none">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-paper text-[15px]">{title}</p>
        <p className="text-xs text-muted mt-0.5 truncate">{desc}</p>
      </div>
      {right}
      <span className="text-muted text-lg">›</span>
    </Link>
  );
}

export function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6">
      <span className="text-3xl mb-2">{icon}</span>
      <p className="font-display font-semibold text-paper">{title}</p>
      <p className="text-sm text-muted mt-1">{desc}</p>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] text-muted block mb-1">{label}</span>
      {children}
    </label>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-xl font-bold text-paper">{title}</h1>
      {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
    </div>
  );
}
