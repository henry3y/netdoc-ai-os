"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", icon: "🏠", label: "Beranda" },
  { href: "/audit", icon: "✅", label: "Audit" },
  { href: "/data", icon: "🗂", label: "Data" },
  { href: "/actions", icon: "🛠", label: "Aksi" },
  { href: "/more", icon: "☰", label: "Lainnya" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-ink/95 backdrop-blur safe-bottom">
      <div className="mx-auto max-w-md grid grid-cols-5">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 py-2.5"
            >
              <span
                className={`text-xl leading-none transition-transform ${active ? "scale-110" : "opacity-60"}`}
              >
                {tab.icon}
              </span>
              <span className={`text-[10px] font-medium ${active ? "text-brand" : "text-muted"}`}>
                {tab.label}
              </span>
              {active && <span className="absolute -mt-[22px] w-1 h-1 rounded-full bg-brand" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
