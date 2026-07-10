"use client";
import { useAppData } from "@/lib/store";
import { DEVICE_TYPES } from "@/lib/data/checklists";
import { assetStatus } from "@/lib/scoring";
import { newId } from "@/lib/hooks/useLocalStorage";
import { PageHeader, EmptyState, Field } from "@/components/ui";
import { AssetRow } from "@/lib/types";

export default function AssetDatabasePage() {
  const { assets, setAssets } = useAppData();

  const update = (id: string, patch: Partial<AssetRow>) => {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };
  const remove = (id: string) => {
    if (confirm("Hapus perangkat ini dari database?")) {
      setAssets((prev) => prev.filter((a) => a.id !== id));
    }
  };
  const add = () => {
    setAssets((prev) => [
      ...prev,
      {
        id: newId("asset"),
        deviceName: "",
        type: DEVICE_TYPES[0],
        brandModel: "",
        ipManagement: "",
        location: "",
        owner: "",
        criticality: "Medium",
        installDate: "",
      },
    ]);
  };

  return (
    <div className="space-y-4 pb-4">
      <PageHeader title="🗂 Asset Database" subtitle="Catat semua perangkat jaringan aktif di sini." />

      {assets.length === 0 && (
        <EmptyState icon="🗂" title="Belum ada perangkat" desc="Tambahkan perangkat pertama Anda." />
      )}

      <div className="space-y-3">
        {assets.map((a) => {
          const status = assetStatus(a);
          return (
            <div key={a.id} className="rounded-xl2 border border-line bg-surface p-4">
              <div className="flex items-center justify-between mb-3">
                <input
                  value={a.deviceName}
                  onChange={(e) => update(a.id, { deviceName: e.target.value })}
                  placeholder="Nama perangkat (mis. CoreSwitch-01)"
                  className="font-display font-semibold text-paper bg-transparent border-b border-line focus:border-brand outline-none flex-1 py-1 text-[15px]"
                />
                <button onClick={() => remove(a.id)} className="text-muted text-lg ml-2" aria-label="Hapus">
                  🗑
                </button>
              </div>

              <span
                className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mb-3 ${
                  status.complete ? "bg-good/15 text-good" : "bg-bad/15 text-bad"
                }`}
              >
                {status.label}
              </span>

              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <Field label="Tipe">
                  <select
                    value={a.type}
                    onChange={(e) => update(a.id, { type: e.target.value })}
                    className="input-field"
                  >
                    {DEVICE_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Kritikalitas">
                  <select
                    value={a.criticality}
                    onChange={(e) => update(a.id, { criticality: e.target.value as AssetRow["criticality"] })}
                    className="input-field"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </Field>
                <Field label="Merk/Model">
                  <input value={a.brandModel} onChange={(e) => update(a.id, { brandModel: e.target.value })} className="input-field font-mono" placeholder="—" />
                </Field>
                <Field label="IP Management">
                  <input value={a.ipManagement} onChange={(e) => update(a.id, { ipManagement: e.target.value })} className="input-field font-mono" placeholder="—" />
                </Field>
                <Field label="Lokasi">
                  <input value={a.location} onChange={(e) => update(a.id, { location: e.target.value })} className="input-field" placeholder="—" />
                </Field>
                <Field label="Owner/PIC">
                  <input value={a.owner} onChange={(e) => update(a.id, { owner: e.target.value })} className="input-field" placeholder="—" />
                </Field>
                <Field label="Tanggal Instalasi">
                  <input
                    type="date"
                    value={a.installDate}
                    onChange={(e) => update(a.id, { installDate: e.target.value })}
                    className="input-field font-mono"
                  />
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
