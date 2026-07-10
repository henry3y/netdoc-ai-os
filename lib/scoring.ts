import { AUDIT_CATEGORIES } from "./data/checklists";
import { AssetRow, Answer, AuditKey, Grade } from "./types";

export type AnswersState = Record<AuditKey, Record<string, Answer>>;

export function emptyAnswers(): AnswersState {
  const state = {} as AnswersState;
  AUDIT_CATEGORIES.forEach((cat) => {
    state[cat.key] = {};
    cat.items.forEach((item) => {
      state[cat.key][item.id] = "Tidak";
    });
  });
  return state;
}

export function subScoreFor(key: AuditKey, answers: AnswersState): number {
  const cat = AUDIT_CATEGORIES.find((c) => c.key === key);
  if (!cat) return 0;
  const totalWeight = cat.items.reduce((s, i) => s + i.weight, 0);
  const earned = cat.items.reduce((s, i) => s + (answers[key]?.[i.id] === "Ya" ? i.weight : 0), 0);
  return totalWeight === 0 ? 0 : Math.round((earned / totalWeight) * 100);
}

export function healthScoreFrom(subScores: Record<AuditKey, number>): number {
  let total = 0;
  AUDIT_CATEGORIES.forEach((cat) => {
    total += (subScores[cat.key] ?? 0) * cat.weight;
  });
  return Math.round(total);
}

export function gradeFor(score: number): Grade {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Critical";
}

export const GRADE_META: Record<Grade, { color: string; bg: string; emoji: string; label: string }> = {
  Excellent: { color: "text-good", bg: "bg-good/15", emoji: "🟢", label: "Excellent" },
  Good: { color: "text-fair", bg: "bg-fair/15", emoji: "🟡", label: "Good" },
  Fair: { color: "text-warn", bg: "bg-warn/15", emoji: "🟠", label: "Fair" },
  Critical: { color: "text-bad", bg: "bg-bad/15", emoji: "🔴", label: "Critical" },
};

export interface GapItem {
  assetId: string;
  deviceName: string;
  location: string;
  owner: string;
  gapType: string;
}

export function computeGaps(assets: AssetRow[]): GapItem[] {
  const gaps: GapItem[] = [];
  assets.forEach((a) => {
    let gapType = "";
    if (!a.brandModel && !a.ipManagement && !a.location && !a.owner) gapType = "⚠️ Kosong Total";
    else if (!a.brandModel) gapType = "⚠️ Merk Kosong";
    else if (!a.ipManagement) gapType = "⚠️ IP Kosong";
    else if (!a.location) gapType = "⚠️ Lokasi Kosong";
    else if (!a.owner) gapType = "⚠️ PIC Kosong";
    if (gapType) {
      gaps.push({ assetId: a.id, deviceName: a.deviceName, location: a.location, owner: a.owner, gapType });
    }
  });
  return gaps;
}

export function assetStatus(a: AssetRow): { label: string; complete: boolean } {
  if (!a.brandModel && !a.ipManagement && !a.location && !a.owner) return { label: "⚠️ Kosong Total", complete: false };
  if (!a.brandModel) return { label: "⚠️ Merk Kosong", complete: false };
  if (!a.ipManagement) return { label: "⚠️ IP Kosong", complete: false };
  if (!a.location) return { label: "⚠️ Lokasi Kosong", complete: false };
  if (!a.owner) return { label: "⚠️ PIC Kosong", complete: false };
  return { label: "✅ Lengkap", complete: true };
}

export function backupStatus(lastBackupDate: string): { label: string; days: number | null; state: "ok" | "expired" | "never" } {
  if (!lastBackupDate) return { label: "⚠️ Belum Pernah Backup", days: null, state: "never" };
  const days = Math.floor((Date.now() - new Date(lastBackupDate).getTime()) / 86400000);
  if (days > 30) return { label: "🔴 Expired", days, state: "expired" };
  return { label: "✅ Up-to-date", days, state: "ok" };
}
