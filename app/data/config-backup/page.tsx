"use client";
import { useAppData } from "@/lib/store";
import { newId } from "@/lib/hooks/useLocalStorage";
import { backupStatus } from "@/lib/scoring";
import { PageHeader, EmptyState, Field } from "@/components/ui";
import { ConfigBackupRow } from "@/lib/types";

export default function ConfigBackupPage() {
  const { configBackup, setConfigBackup } = useAppData();

  const update = (id: string, patch: Partial<ConfigBackupRow>) => {
    setConfigBackup((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const remove = (id: string) => {
    if (confirm("Hapus log ini?")) setConfigBackup((prev) => prev.filter((c) => c.id !== id));
  };
  const add = () => {
    setConfigBackup((prev) => [
      ...prev,
      { id: newId("cfg"), device: "", lastBackupDate: "", firmwareVersion: "", backupLocation: "", pic: "" },
    ]);
  };

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="⚙️ Config & Backup Log" subtitle="Status otomatis 'Expired' jika backup lebih dari 30 hari." />

      {configBackup.length === 0 && <EmptyState icon="⚙️" title="Belum ada log backup" desc="Tambahkan perangkat pertama." />}

      <div className="space-y-3">
        {configBackup.map((c) => {
          const status = backupStatus(c.lastBackupDate);
          return (
            <div key={c.id} className="rounded-xl2 border border-line bg-surface p-4">
              <div className="flex items-center justify-between mb-3">
                <input
                  value={c.device}
                  onChange={(e) => update(c.id, { device: e.target.value })}
                  placeholder="Device"
                  className="font-display font-semibold text-paper bg-transparent border-b border-line focus:border-brand outline-none flex-1 py-1 text-[15px]"
                />
                <button onClick={() => remove(c.id)} className="text-muted text-lg ml-2">🗑</button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    status.state === "ok" ? "bg-good/15 text-good" : "bg-bad/15 text-bad"
                  }`}
                >
                  {status.label}
                </span>
                {status.days != null && <span className="text-[11px] font-mono text-muted">{status.days} hari lalu</span>}
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <Field label="Tanggal Backup Terakhir">
                  <input type="date" value={c.lastBackupDate} onChange={(e) => update(c.id, { lastBackupDate: e.target.value })} className="input-field font-mono" />
                </Field>
                <Field label="Versi Firmware">
                  <input value={c.firmwareVersion} onChange={(e) => update(c.id, { firmwareVersion: e.target.value })} className="input-field font-mono" />
                </Field>
                <div className="col-span-2">
                  <Field label="Lokasi File Backup">
                    <input value={c.backupLocation} onChange={(e) => update(c.id, { backupLocation: e.target.value })} className="input-field font-mono" placeholder="Drive/Backup/..." />
                  </Field>
                </div>
                <Field label="PIC">
                  <input value={c.pic} onChange={(e) => update(c.id, { pic: e.target.value })} className="input-field" />
                </Field>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={add} className="w-full text-sm font-semibold text-brand border border-brand/30 bg-brand/10 rounded-xl2 py-3">
        + Tambah Perangkat
      </button>
    </div>
  );
}
