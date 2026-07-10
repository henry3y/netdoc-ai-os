import { AssetRow, TopologyRow, ConfigBackupRow, ChangeLogRow, ActionItem, ProgressEntry } from "../types";

export const SEED_ASSETS: AssetRow[] = [
  { id: "d1", deviceName: "CoreSwitch-01", type: "Switch Core", brandModel: "Cisco C9300", ipManagement: "192.168.1.2", location: "Server Room", owner: "IT Team", criticality: "High", installDate: "2024-01-12" },
  { id: "d2", deviceName: "AP-Lt2-Timur", type: "Access Point", brandModel: "Ubiquiti U6-Pro", ipManagement: "192.168.1.15", location: "Lantai 2 Timur", owner: "GA", criticality: "Medium", installDate: "2025-05-03" },
  { id: "d3", deviceName: "FW-Edge-01", type: "Firewall", brandModel: "Fortinet 60F", ipManagement: "192.168.1.1", location: "Server Room", owner: "IT Team", criticality: "High", installDate: "2023-11-20" },
  { id: "d4", deviceName: "Switch-Lt1-01", type: "Switch Access", brandModel: "TP-Link SG108", ipManagement: "", location: "Lantai 1", owner: "", criticality: "Low", installDate: "2024-02-15" },
  { id: "d5", deviceName: "Router-Cabang-A", type: "Router", brandModel: "Mikrotik RB4011", ipManagement: "10.10.10.1", location: "", owner: "IT Team", criticality: "High", installDate: "2024-06-01" },
];

export const SEED_TOPOLOGY: TopologyRow[] = [
  { id: "tp1", device: "CoreSwitch-01", connectedTo: "FW-Edge-01", connectionType: "Fiber Uplink", physicalLocation: "Server Room", redundancy: "Ya", diagramLink: "" },
  { id: "tp2", device: "Switch-Lt1-01", connectedTo: "CoreSwitch-01", connectionType: "UTP Cat6", physicalLocation: "Lantai 1", redundancy: "Tidak", diagramLink: "" },
  { id: "tp3", device: "AP-Lt2-Timur", connectedTo: "Switch-Lt1-01", connectionType: "UTP Cat6 (PoE)", physicalLocation: "Lantai 2 Timur", redundancy: "Tidak", diagramLink: "" },
];

export const SEED_CONFIG_BACKUP: ConfigBackupRow[] = [
  { id: "cb1", device: "CoreSwitch-01", lastBackupDate: "2026-06-20", firmwareVersion: "IOS-XE 17.9", backupLocation: "Drive/Backup/CoreSwitch01.cfg", pic: "IT Team" },
  { id: "cb2", device: "FW-Edge-01", lastBackupDate: "2026-04-01", firmwareVersion: "FortiOS 7.2", backupLocation: "", pic: "IT Team" },
  { id: "cb3", device: "Router-Cabang-A", lastBackupDate: "2026-07-01", firmwareVersion: "RouterOS 7.15", backupLocation: "Drive/Backup/RouterCabangA.rsc", pic: "IT Team" },
];

export const SEED_CHANGE_LOG: ChangeLogRow[] = [
  { id: "cl1", date: "2026-06-15", device: "FW-Edge-01", change: "Update rule firewall untuk VPN baru", by: "Andi (IT)", reason: "Permintaan cabang baru", approval: "Disetujui" },
  { id: "cl2", date: "2026-06-28", device: "CoreSwitch-01", change: "Upgrade firmware ke IOS-XE 17.9", by: "Budi (IT)", reason: "Patch keamanan", approval: "Disetujui" },
];

export const DEFAULT_ACTION_PLAN: ActionItem[] = [
  { id: "ap1", tahap: "Hari Ini", langkah: "Backup & verifikasi konfigurasi perangkat kritis yang belum tercatat", prioritas: "Sangat Tinggi", estimasi: "1 jam", kesulitan: "Mudah", biaya: "Rp0", dampak: "Tinggi", status: "Pending" },
  { id: "ap2", tahap: "Hari Ini", langkah: "Lengkapi kolom Owner/PIC yang kosong di Asset Database", prioritas: "Tinggi", estimasi: "30 menit", kesulitan: "Mudah", biaya: "Rp0", dampak: "Sedang", status: "Pending" },
  { id: "ap3", tahap: "3 Hari", langkah: "Update diagram topologi untuk area yang belum tercakup", prioritas: "Tinggi", estimasi: "2-3 jam", kesulitan: "Sedang", biaya: "Rp0", dampak: "Tinggi", status: "Pending" },
  { id: "ap4", tahap: "3 Hari", langkah: "Standarkan naming convention seluruh perangkat", prioritas: "Sedang", estimasi: "1-2 jam", kesulitan: "Mudah", biaya: "Rp0", dampak: "Sedang", status: "Pending" },
  { id: "ap5", tahap: "7 Hari", langkah: "Terapkan SOP Change Log wajib untuk setiap perubahan", prioritas: "Sedang", estimasi: "2 jam (setup)", kesulitan: "Sedang", biaya: "Rp0", dampak: "Tinggi", status: "Pending" },
  { id: "ap6", tahap: "7 Hari", langkah: "Susun SOP handover antar teknisi", prioritas: "Sedang", estimasi: "2 jam", kesulitan: "Sedang", biaya: "Rp0", dampak: "Sedang", status: "Pending" },
  { id: "ap7", tahap: "30 Hari", langkah: "Jadwalkan review dokumentasi rutin bulanan/kuartalan", prioritas: "Tinggi", estimasi: "1 hari (setup)", kesulitan: "Mudah", biaya: "Rp0", dampak: "Tinggi", status: "Pending" },
  { id: "ap8", tahap: "30 Hari", langkah: "Audit ulang penuh & bandingkan hasil", prioritas: "Tinggi", estimasi: "30 menit", kesulitan: "Mudah", biaya: "Rp0", dampak: "Verifikasi", status: "Pending" },
];

export const SEED_PROGRESS: ProgressEntry[] = [
  { id: "pg1", date: "2026-06-05", healthScore: 58, subScores: "55/50/60/70", mainIssue: "Diagram topologi tidak update, config kosong", actionTaken: "Update diagram & backup config", status: "Selesai", note: "-" },
  { id: "pg2", date: "2026-06-20", healthScore: 74, subScores: "70/65/75/82", mainIssue: "Change Log belum konsisten", actionTaken: "Terapkan SOP Change Log", status: "Selesai", note: "-" },
];
