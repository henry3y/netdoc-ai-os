import { GejalaDef } from "../types";

export const GEJALA_LIST: GejalaDef[] = [
  {
    id: "g0",
    gejala: "(Tidak ada gejala)",
    bobotDampak: 0,
    area: "-",
    tindakan: "-",
  },
  {
    id: "g1",
    gejala: "Teknisi baru butuh waktu lama memahami jaringan",
    bobotDampak: 20,
    area: "Topology / Onboarding",
    tindakan: "Cek kelengkapan diagram & SOP handover",
  },
  {
    id: "g2",
    gejala: "Konfigurasi hilang setelah perangkat rusak/reset",
    bobotDampak: 20,
    area: "Config Backup",
    tindakan: "Cek Config & Backup Log, restore dari backup terakhir",
  },
  {
    id: "g3",
    gejala: "Tidak tahu perangkat mana yang boleh dimatikan",
    bobotDampak: 15,
    area: "Topology / Criticality Label",
    tindakan: "Cek label kritikalitas & jalur redundansi",
  },
  {
    id: "g4",
    gejala: "Perubahan jaringan menyebabkan masalah tak terduga",
    bobotDampak: 15,
    area: "Change Management",
    tindakan: "Cek Change Log, apakah ada approval sebelumnya",
  },
  {
    id: "g5",
    gejala: "Dua teknisi melakukan perubahan konfigurasi bertabrakan",
    bobotDampak: 15,
    area: "Change Management / Access Control",
    tindakan: "Terapkan approval process & log terpusat",
  },
  {
    id: "g6",
    gejala: "Dokumentasi tidak sesuai kondisi fisik di lapangan",
    bobotDampak: 15,
    area: "Asset Inventory Accuracy",
    tindakan: "Lakukan physical audit & sinkronkan database",
  },
];

export interface DecisionRule {
  id: string;
  condition: string;
  recommendation: string;
  priority: "Sangat Tinggi" | "Tinggi" | "Sedang" | "Rendah";
  isActive: (ctx: DecisionContext) => boolean;
}

export interface DecisionContext {
  assetScore: number;
  topologyScore: number;
  configScore: number;
  standardScore: number;
  healthScore: number;
  gapCount: number;
}

export const DECISION_RULES: DecisionRule[] = [
  {
    id: "r1",
    condition: "Config & Backup Score < 70",
    recommendation: "Backup & verifikasi konfigurasi device yang belum ter-cover segera",
    priority: "Sangat Tinggi",
    isActive: (c) => c.configScore < 70,
  },
  {
    id: "r2",
    condition: "Topology Score < 70",
    recommendation: "Update/lengkapi diagram topologi jaringan",
    priority: "Tinggi",
    isActive: (c) => c.topologyScore < 70,
  },
  {
    id: "r3",
    condition: "Asset Inventory Score < 70",
    recommendation: "Lengkapi dokumentasi Asset Database (Owner, Lokasi, Status)",
    priority: "Tinggi",
    isActive: (c) => c.assetScore < 70,
  },
  {
    id: "r4",
    condition: "Standard & Change Score < 70",
    recommendation: "Terapkan SOP Change Log & approval process",
    priority: "Tinggi",
    isActive: (c) => c.standardScore < 70,
  },
  {
    id: "r5",
    condition: "Jumlah Gap Dokumentasi Aktif > 5",
    recommendation: "Lakukan sprint dokumentasi mingguan untuk menutup gap",
    priority: "Tinggi",
    isActive: (c) => c.gapCount > 5,
  },
  {
    id: "r6",
    condition: "Semua Sub Score ≥ 85 dan gap = 0",
    recommendation: "Tidak ada tindakan mendesak, lanjut monitoring rutin",
    priority: "Rendah",
    isActive: (c) => c.healthScore >= 85 && c.gapCount === 0,
  },
];

export function getTopDecision(ctx: DecisionContext): DecisionRule {
  const priorityOrder = { "Sangat Tinggi": 0, Tinggi: 1, Sedang: 2, Rendah: 3 };
  const active = DECISION_RULES.filter((r) => r.isActive(ctx));
  if (active.length === 0) {
    return {
      id: "default",
      condition: "-",
      recommendation: "Kondisi Baik - Monitoring Rutin",
      priority: "Rendah",
      isActive: () => true,
    };
  }
  return active.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])[0];
}
