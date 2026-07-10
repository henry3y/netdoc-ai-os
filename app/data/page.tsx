"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, HubLink } from "@/components/ui";

export default function DataHubPage() {
  const { assets, topology, configBackup, changeLog, gapCount } = useAppData();

  return (
    <div className="space-y-5">
      <PageHeader title="Database Jaringan" subtitle="Sumber data untuk seluruh perhitungan audit & gap." />
      <div className="space-y-3">
        <HubLink
          href="/data/assets"
          icon="🗂"
          title="Asset Database"
          desc={`${assets.length} perangkat tercatat`}
        />
        <HubLink
          href="/data/topology"
          icon="🗺"
          title="Topology Map"
          desc={`${topology.length} koneksi terdokumentasi`}
        />
        <HubLink
          href="/data/config-backup"
          icon="⚙️"
          title="Config & Backup Log"
          desc={`${configBackup.length} perangkat dipantau`}
        />
        <HubLink
          href="/data/change-log"
          icon="📝"
          title="Change Log"
          desc={`${changeLog.length} riwayat perubahan`}
        />
        <HubLink
          href="/data/gap-detection"
          icon="⚠️"
          title="Gap Detection"
          desc={gapCount > 0 ? `${gapCount} gap aktif — perlu ditindak` : "Tidak ada gap aktif"}
        />
      </div>
    </div>
  );
}
