"use client";
import { useAppData } from "@/lib/store";
import { GEJALA_LIST } from "@/lib/data/troubleshooting";
import { PageHeader, Card } from "@/components/ui";

export default function TroubleshootingPage() {
  const { selectedGejala, setSelectedGejala } = useAppData();
  const current = GEJALA_LIST.find((g) => g.id === selectedGejala) ?? GEJALA_LIST[0];

  return (
    <div className="space-y-5 pb-4">
      <PageHeader title="🔍 Troubleshooting" subtitle="Pilih gejala yang sedang dialami untuk melihat diagnosa cepat." />

      <div>
        <label className="text-xs text-muted block mb-1.5">Gejala Dipilih</label>
        <select
          value={selectedGejala}
          onChange={(e) => setSelectedGejala(e.target.value)}
          className="input-field !text-sm !py-2.5"
        >
          {GEJALA_LIST.map((g) => (
            <option key={g.id} value={g.id}>
              {g.gejala}
            </option>
          ))}
        </select>
      </div>

      {current.id !== "g0" && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted">Bobot Dampak</span>
            <span className="font-mono font-bold text-bad">{current.bobotDampak}</span>
          </div>
          <div className="mb-3">
            <p className="text-xs text-muted mb-1">Kemungkinan Area</p>
            <p className="text-paper font-display font-semibold">{current.area}</p>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">Tindakan Direkomendasikan</p>
            <p className="text-paper text-sm leading-relaxed">{current.tindakan}</p>
          </div>
        </Card>
      )}

      <div>
        <p className="text-xs text-muted mb-2 uppercase tracking-wide font-semibold">Semua Gejala Umum</p>
        <div className="space-y-2">
          {GEJALA_LIST.filter((g) => g.id !== "g0").map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGejala(g.id)}
              className="w-full text-left rounded-xl2 border border-line bg-surface p-3.5 active:bg-surface2"
            >
              <p className="text-sm text-paper">{g.gejala}</p>
              <p className="text-xs text-muted mt-1">{g.area}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
