export type Answer = "Ya" | "Tidak";

export type AuditKey = "asset" | "topology" | "config" | "standard";

export interface ChecklistItem {
  id: string;
  question: string;
  weight: number;
  reason: string;
  tips: string;
}

export interface AuditCategoryDef {
  key: AuditKey;
  title: string;
  shortTitle: string;
  icon: string;
  weight: number;
  items: ChecklistItem[];
}

export interface AssetRow {
  id: string;
  deviceName: string;
  type: string;
  brandModel: string;
  ipManagement: string;
  location: string;
  owner: string;
  criticality: "High" | "Medium" | "Low";
  installDate: string;
}

export interface TopologyRow {
  id: string;
  device: string;
  connectedTo: string;
  connectionType: string;
  physicalLocation: string;
  redundancy: "Ya" | "Tidak";
  diagramLink: string;
}

export interface ConfigBackupRow {
  id: string;
  device: string;
  lastBackupDate: string; // ISO date string or ""
  firmwareVersion: string;
  backupLocation: string;
  pic: string;
}

export interface ChangeLogRow {
  id: string;
  date: string;
  device: string;
  change: string;
  by: string;
  reason: string;
  approval: "Disetujui" | "Pending" | "Ditolak";
}

export interface GejalaDef {
  id: string;
  gejala: string;
  bobotDampak: number;
  area: string;
  tindakan: string;
}

export interface ActionItem {
  id: string;
  tahap: "Hari Ini" | "3 Hari" | "7 Hari" | "30 Hari";
  langkah: string;
  prioritas: "Sangat Tinggi" | "Tinggi" | "Sedang" | "Rendah";
  estimasi: string;
  kesulitan: "Mudah" | "Sedang" | "Sulit";
  biaya: string;
  dampak: string;
  status: "Pending" | "Berjalan" | "Selesai";
}

export interface ProgressEntry {
  id: string;
  date: string;
  healthScore: number;
  subScores: string;
  mainIssue: string;
  actionTaken: string;
  status: "Selesai" | "Berjalan" | "Pending";
  note: string;
}

export type Grade = "Excellent" | "Good" | "Fair" | "Critical";
