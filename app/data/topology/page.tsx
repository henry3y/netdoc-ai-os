"use client";
import { useAppData } from "@/lib/store";
import { newId } from "@/lib/hooks/useLocalStorage";
import { PageHeader, EmptyState, Field } from "@/components/ui";
import { TopologyRow } from "@/lib/types";

export default function TopologyPage() {
  const { topology, setTopology } = useAppData();

  const update = (id: string, patch: Partial<TopologyRow>) => {
    setTopology((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };
  const remove = (id: string) => {
    if (confirm("Hapus koneksi ini?")) setTopology((prev) => prev.filter((t) => t.id !== id));
  };
  const add = () => {
    setTopology((prev) => [
      ...prev,
      { id: newId("topo"), device: "", connectedTo: "", connectionType: "", physicalLocation: "", redundancy: "Tidak", diagramLink: "" },
    ]);
  };

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="🗺 Topology Map" subtitle="Catat hubungan antar perangkat (uplink/downlink)." />

      {topology.length === 0 && <EmptyState icon="🗺" title="Belum ada data topologi" desc="Tambahkan koneksi pertama." />}

      <div className="space-y-3">
        {topology.map((t) => (
          <div key={t.id} className="rounded-xl2 border border-line bg-surface p-4">
            <div className="flex items-center justify-between mb-3">
              <input
                value={t.device}
                onChange={(e) => update(t.id, { device: e.target.value })}
                placeholder="Device"
                className="font-display font-semibold text-paper bg-transparent border-b border-line focus:border-brand outline-none flex-1 py-1 text-[15px]"
              />
              <button onClick={() => remove(t.id)} className="text-muted text-lg ml-2">🗑</button>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-sm">
              <Field label="Terhubung Ke">
                <input value={t.connectedTo} onChange={(e) => update(t.id, { connectedTo: e.target.value })} className="input-field" />
              </Field>
              <Field label="Jenis Koneksi">
                <input value={t.connectionType} onChange={(e) => update(t.id, { connectionType: e.target.value })} className="input-field" placeholder="Fiber/UTP/VPN" />
              </Field>
              <Field label="Lokasi Fisik">
                <input value={t.physicalLocation} onChange={(e) => update(t.id, { physicalLocation: e.target.value })} className="input-field" />
              </Field>
              <Field label="Redundansi?">
                <select value={t.redundancy} onChange={(e) => update(t.id, { redundancy: e.target.value as "Ya" | "Tidak" })} className="input-field">
                  <option value="Ya">Ya</option>
                  <option value="Tidak">Tidak</option>
                </select>
              </Field>
              <div className="col-span-2">
                <Field label="Link Diagram (draw.io/Lucidchart)">
                  <input value={t.diagramLink} onChange={(e) => update(t.id, { diagramLink: e.target.value })} className="input-field font-mono" placeholder="https://..." />
                </Field>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={add} className="w-full text-sm font-semibold text-brand border border-brand/30 bg-brand/10 rounded-xl2 py-3">
        + Tambah Koneksi
      </button>
    </div>
  );
}
