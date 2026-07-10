"use client";
import { useAppData } from "@/lib/store";
import { newId } from "@/lib/hooks/useLocalStorage";
import { PageHeader, EmptyState, Field } from "@/components/ui";
import { ChangeLogRow } from "@/lib/types";

export default function ChangeLogPage() {
  const { changeLog, setChangeLog } = useAppData();

  const update = (id: string, patch: Partial<ChangeLogRow>) => {
    setChangeLog((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const remove = (id: string) => {
    if (confirm("Hapus entri ini?")) setChangeLog((prev) => prev.filter((c) => c.id !== id));
  };
  const add = () => {
    setChangeLog((prev) => [
      { id: newId("cl"), date: new Date().toISOString().slice(0, 10), device: "", change: "", by: "", reason: "", approval: "Pending" },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="📝 Change Log" subtitle="Catat SETIAP perubahan sebelum dilakukan (SOP Change Management)." />

      <button onClick={add} className="w-full text-sm font-semibold text-brand border border-brand/30 bg-brand/10 rounded-xl2 py-3">
        + Catat Perubahan Baru
      </button>

      {changeLog.length === 0 && <EmptyState icon="📝" title="Belum ada riwayat perubahan" desc="Catat perubahan pertama Anda." />}

      <div className="space-y-3">
        {changeLog.map((c) => (
          <div key={c.id} className="rounded-xl2 border border-line bg-surface p-4">
            <div className="flex items-center justify-between mb-3 gap-2">
              <input type="date" value={c.date} onChange={(e) => update(c.id, { date: e.target.value })} className="input-field font-mono flex-shrink-0 w-auto" />
              <select
                value={c.approval}
                onChange={(e) => update(c.id, { approval: e.target.value as ChangeLogRow["approval"] })}
                className={`text-[11px] font-semibold px-2 py-1 rounded-full border-0 ${
                  c.approval === "Disetujui" ? "bg-good/15 text-good" : c.approval === "Pending" ? "bg-warn/15 text-warn" : "bg-bad/15 text-bad"
                }`}
              >
                <option value="Disetujui">Disetujui</option>
                <option value="Pending">Pending</option>
                <option value="Ditolak">Ditolak</option>
              </select>
              <button onClick={() => remove(c.id)} className="text-muted text-lg ml-auto">🗑</button>
            </div>
            <div className="space-y-2.5 text-sm">
              <Field label="Device">
                <input value={c.device} onChange={(e) => update(c.id, { device: e.target.value })} className="input-field font-mono" />
              </Field>
              <Field label="Perubahan">
                <input value={c.change} onChange={(e) => update(c.id, { change: e.target.value })} className="input-field" />
              </Field>
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Oleh">
                  <input value={c.by} onChange={(e) => update(c.id, { by: e.target.value })} className="input-field" />
                </Field>
                <Field label="Alasan">
                  <input value={c.reason} onChange={(e) => update(c.id, { reason: e.target.value })} className="input-field" />
                </Field>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
