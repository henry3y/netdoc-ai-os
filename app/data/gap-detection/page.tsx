"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, EmptyState, Card } from "@/components/ui";
import Link from "next/link";

export default function GapDetectionPage() {
  const { gaps, gapScore, assets } = useAppData();

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="⚠️ Gap Detection" subtitle="Perangkat di Asset Database yang dokumentasinya belum lengkap." />

      <Card className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">Gap Score</p>
          <p className="font-mono font-bold text-2xl text-paper">{gapScore}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Gap Aktif</p>
          <p className={`font-mono font-bold text-2xl ${gaps.length > 0 ? "text-bad" : "text-good"}`}>{gaps.length}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Total Device</p>
          <p className="font-mono font-bold text-2xl text-paper">{assets.length}</p>
        </div>
      </Card>

      {gaps.length === 0 ? (
        <EmptyState icon="✅" title="Tidak ada gap dokumentasi" desc="Semua perangkat di Asset Database sudah lengkap." />
      ) : (
        <div className="space-y-2.5">
          {gaps.map((g) => (
            <Link key={g.assetId} href="/data/assets" className="block rounded-xl2 border border-bad/30 bg-bad/5 p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono font-semibold text-paper text-sm">{g.deviceName || "(tanpa nama)"}</p>
                <span className="text-[11px] font-semibold text-bad bg-bad/15 rounded-full px-2 py-0.5">{g.gapType}</span>
              </div>
              <p className="text-xs text-muted mt-1">
                {g.location || "Lokasi belum diisi"} • {g.owner || "PIC belum diisi"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
